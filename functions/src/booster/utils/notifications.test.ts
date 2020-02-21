import * as adminSDK from "../../adminsdk.json";
import * as admin from "firebase-admin";

beforeAll(() => {
  admin.initializeApp({
    credential: admin.credential.cert(adminSDK as any)
  });
});
