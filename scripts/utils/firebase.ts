import * as fs from "fs";
import * as path from "path";
import * as admin from "firebase-admin";

const currentEnv = () => {
  return fs
    .readFileSync(path.resolve(__dirname, "../.current_project"), {
      encoding: "utf-8",
    })
    .trim();
};

const configFor = (env: string) => {
  return JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../configs/${env}/adminsdk.json`),
      { encoding: "utf-8" }
    )
  );
};

export const setupFirebase = () => {
  const env = currentEnv();
  console.log(`Current Env: \n- \x1b[1m${env}\x1b[0m`);
  admin.initializeApp({
    credential: admin.credential.cert(configFor(env)),
  });
};
