import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
admin.initializeApp();
import { auth } from "./auth";
import { bodyFiles } from "./bodyfiles";
import { gcsUpload } from "./gcs";
import { imageResize, ImageFile } from "./images";

const store = admin.firestore();
const expApp = express();
expApp.use(cors({ origin: true }));
expApp.use(cookieParser());
expApp.use(auth);

expApp.post(
  "/avatar",
  bodyFiles,
  imageResize,
  gcsUpload("mercy-b94dd.appspot.com"),
  (req: any, res) => {
    const uploads = req.uploads as Array<Promise<string>>;
    Promise.all(uploads)
      .then(() => req.cleanup())
      .catch(error => {
        console.log(error);
        req.cleanup();
      });

    const images: ImageFile[] = req.imageFiles;
    if (images.filter(img => !img.variance).length > 0) {
      const imgId = images.filter(img => !img.variance)[0].id;
      const uid = req.user.uid;
      const user = store.collection("users").doc(uid);
      const image = store.collection("images").doc(imgId);
      user.update({ avatar: image }).then(() => res.send(imgId));
    } else {
      res.status(400).send("Body Error");
    }
  }
);

expApp.post(
  "/upload",
  bodyFiles,
  imageResize,
  gcsUpload("mercy-b94dd.appspot.com"),
  (req: any, res) => {
    const uploads = req.uploads as Array<Promise<string>>;
    Promise.all(uploads)
      .then(() => {
        res.send("Success\n");
        req.cleanup();
      })
      .catch(error => {
        console.log(error);
        req.cleanup();
      });
  }
);

export const api = functions.https.onRequest(expApp);
