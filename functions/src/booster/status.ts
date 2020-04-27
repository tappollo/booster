import * as functions from "firebase-functions";
import * as config from "../server.json";
import * as version from "../version.json";

export const statusCheck = functions.https.onRequest(async (req, resp) => {
  console.log(`Status page requested, version ${version.hash}`);
  resp.send({
    name: config.name,
    version,
  });
});
