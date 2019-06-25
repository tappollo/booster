#!./node_modules/.bin/ts-node

import * as fs from "fs";
import * as path from "path";

import {
  isInGithubAction,
  getRemoteOptions,
  getRelease
} from "./utils/githubAction";
import { deployRemotely, deploy } from "./utils/release";
import chalk from "chalk";

(async () => {
  if (isInGithubAction()) {
    await deployRemotely(getRemoteOptions(), getRelease());
    return;
  }
  if (fs.existsSync(path.resolve(__dirname, "./deploy.json"))) {
    await deploy();
    return;
  }

  console.log(`
./deploy.ts

Usage:

  you need a ${chalk.bold("deploy.json")} that contains following
  {
    "prerelease": false,
    "tag_name": "1.1.1",
    "body": "release note"
  }
  `);
})();
