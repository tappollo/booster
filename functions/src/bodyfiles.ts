import * as Busboy from "busboy";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import UUID from "pure-uuid";

export interface BodyFile {
  path: string;
  name: string;
  encoding: string;
  mimetype: string;
  fieldname: string;
  id: string;
}

export const bodyFiles = (req: any, res: any, next: any) => {
  const busboy = new Busboy({ headers: (req as { headers: any }).headers });
  const tmpdir = os.tmpdir();
  const files: BodyFile[] = [];
  const fileWrites: Array<Promise<any>> = [];

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(
      `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
    );
    const randomID = new UUID(4).format("b16");
    const filepath = path.join(tmpdir, randomID);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    files.push({
      path: filepath,
      name: filename,
      encoding,
      mimetype,
      fieldname,
      id: randomID
    });

    fileWrites.push(
      new Promise((resolve, reject) => {
        file.on("end", () => {
          writeStream.end();
        });
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      })
    );

    if (!req.cleanups) {
      req.cleanups = [];
      req.cleanup = () => req.cleanups.forEach((x: () => void) => x());
    }
    req.cleanups.push(() => {
      fs.unlinkSync(filepath);
    });
  });

  busboy.on("finish", () => {
    Promise.all(fileWrites)
      .then(() => {
        req.bodyFiles = files;
        next();
      })
      .catch(e => console.log(e));
  });

  busboy.end(req.rawBody);
};
