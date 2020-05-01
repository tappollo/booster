import * as functions from "firebase-functions";
import * as config from "../server.json";

export const statusCheck = functions.https.onRequest(async (req, resp) => {
  console.log(`Status page requested`);
  resp.send({
    name: config.name,
  });
});
