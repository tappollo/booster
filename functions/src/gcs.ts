import { Storage } from "@google-cloud/storage";
import * as admin from "firebase-admin";
import * as path from "path";
import * as sizeOf from "image-size";
import * as sharp from "sharp";
import { ImageFile } from "./images";
import * as adminSDK from "./adminsdk.json";

const gcs = new Storage({
  credentials: adminSDK
});

const store = admin.firestore();

const imageGCSPath = (img: ImageFile) => {
  const sufix = img.variance ? `_${img.variance}` : "";
  return path.join("images", img.id + sufix);
};

const imgDoc = (img: ImageFile) => store.collection("images").doc(img.id);

export const gcsUpload = (bucketName: string) => (
  req: any,
  res: any,
  next: any
) => {
  const bucket = gcs.bucket(bucketName);
  const images: ImageFile[] = req.imageFiles;
  Promise.all(
    images
      .filter(img => !img.variance)
      .map(async img => {
        const buffer = await sharp(img.path)
          .resize(({
            width: 12,
            fit: "outside"
          } as unknown) as number)
          .png()
          .toBuffer();
        const base64 = buffer.toString("base64");
        return await imgDoc(img).create({
          base64,
          width: sizeOf(img.path).width,
          height: sizeOf(img.path).height
        });
      })
  ).then(() => {
    req.uploads = images.map(img =>
      bucket
        .upload(img.path, {
          resumable: false,
          destination: imageGCSPath(img),
          gzip: true,
          metadata: {
            cacheControl: "public, max-age=31536000",
            contentType: img.mimetype
          }
        })
        .then(([file]) =>
          file.getSignedUrl({ action: "read", expires: "01-01-2500" })
        )
        .then(async url => {
          const doc = store.collection("images").doc(img.id);
          const obj: { [key: string]: string } = {};
          obj[img.variance || "original"] = url[0];
          await doc.update(obj).catch(error => {
            console.log(error);
            doc.create(obj);
          });
          return img.id;
        })
    );
    next();
  });
};
