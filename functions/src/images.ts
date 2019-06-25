import * as path from "path";
import * as os from "os";
import * as sharp from "sharp";
import * as fs from "fs";
import { BodyFile } from "./bodyfiles";

export interface ImageFile extends BodyFile {
  options?: any;
  variance?: string;
}

const sizes = [
  {
    name: "sm",
    options: {
      width: 120,
      fit: "outside"
    }
  },
  {
    name: "md",
    options: {
      width: 240,
      fit: "outside"
    }
  },
  {
    name: "lg",
    options: {
      width: 480,
      fit: "outside"
    }
  },
  {
    name: "xl",
    options: {
      width: 960,
      fit: "outside"
    }
  }
];

export const imageResize = (req: any, res: any, next: any) => {
  if (!req.bodyFiles) {
    res.status(400).send("No files uploaded");
    return;
  }
  const tmpdir = os.tmpdir();
  const files: BodyFile[] = req.bodyFiles;
  Promise.all(
    files
      .filter(f => f.mimetype.startsWith("image/"))
      .map(async f => {
        const imageVariances = sizes.map(size => ({
          ...f,
          options: size.options,
          variance: size.name,
          path: path.join(tmpdir, `${f.id}_${size.name}`),
          mimetype: "image/jpeg"
        }));
        req.cleanups.push(() => {
          imageVariances.map(img => img.path).forEach(fs.unlinkSync);
        });
        await Promise.all(
          imageVariances.map(img =>
            sharp(f.path)
              .resize((img.options as unknown) as number)
              .jpeg()
              .toFile(img.path)
          )
        );
        return [f, ...imageVariances];
      })
  )
    .then(imgs => imgs.reduce((acc, x) => acc.concat(x)))
    .then(imgs => {
      req.imageFiles = imgs;
      next();
    });
};
