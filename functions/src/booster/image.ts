import fetch from "node-fetch";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import sharp = require("sharp");
import md5 = require("md5");

const resizeFn = async (props: {
  url: string;
  width: number;
  height: number;
}) => {
  console.log(
    `resize image at ${props.url} to ${props.width} x ${props.height}`
  );
  const key = md5(JSON.stringify(props));
  const file = admin
    .storage()
    .bucket()
    .file(`imageCache/${key}`);
  if ((await file.exists())[0]) {
    console.log("cache hit");
    return (await file.download())[0];
  }
  console.log("No cache available, resizing...");
  const { url, width, height } = props;
  const response = await fetch(url);
  const downloaded = await response.buffer();
  const resized = await sharp(downloaded)
    .resize(width, height, {
      fit: "cover"
    })
    .toBuffer();
  await file.save(resized, {
    metadata: {
      cacheControl: "public,max-age=300",
      contentType: "image/jpeg"
    }
  });
  console.log("Image resized...");
  return resized;
};

export const resize = functions.https.onRequest(async (req, resp) => {
  const { url, width, height } = req.query;
  resp.setHeader("Cache-Control", "public,max-age=31536000");
  resp.setHeader("Content-Type", "image/jpeg");
  const resizedImage = await resizeFn({
    url,
    width: parseInt(width, 10),
    height: parseInt(height, 10)
  });
  resp.end(resizedImage);
});
