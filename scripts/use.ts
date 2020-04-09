#!/usr/bin/env ts-node

import * as chalk from "chalk";
import * as meow from "meow";
import * as path from "path";
import { run } from "./utils/run";
import * as fs from "fs-extra";
import * as process from "process";
import ora = require("ora");

(async () => {
  process.chdir(__dirname);

  const cli = meow(
    `
    Usage:
    
      ./use.ts [dev|staging|prod]
  `
  );

  const env: string | undefined = cli.input[0];

  if (!env) {
    try {
      const currentEnv = fs
        .readFileSync(path.resolve(__dirname, "./.current_project"), "utf-8")
        .trim();
      console.log(`Current project: ${chalk.bold(currentEnv)}`);
    } catch {
      cli.showHelp();
    }
  } else {
    const spinner = ora(`Set env to: ${chalk.bold(env)}\n`).start();
    try {
      await run(`../node_modules/.bin/firebase use ${env}`);

      const fileMappings = {
        "GoogleService-Info.plist": "../app/ios/GoogleService-Info.plist",
        "google-services.json": "../app/android/app/google-services.json",
        Appfile: "../app/fastlane/Appfile",
        Matchfile: "../app/fastlane/Matchfile",
        "build.json": "../app/build.json",
        "Info.plist": "../app/ios/mercy/Info.plist",
        "strings.xml": "../app/android/app/src/main/res/values/strings.xml",
        "release.keystore": "../app/android/keystores/release.keystore",
        "adminsdk.json": "../functions/src/adminsdk.json",
        "server.json": "../functions/src/server.json",
      };

      for (const key of Object.keys(fileMappings) as Array<
        keyof typeof fileMappings
      >) {
        await fs.remove(fileMappings[key]);
        await fs.ensureSymlink(`./configs/${env}/${key}`, fileMappings[key]);
      }

      // metro on react native doesn't support fs link
      // So we copied it and set it to ready only
      // "app.json": "../app/src/app.json"
      await fs.remove("../app/src/app.json");
      await fs.copy(`./configs/${env}/app.json`, "../app/src/app.json");
      await fs.chmod("../app/src/app.json", "444");

      await run(
        `echo ${env} > ${path.resolve(__dirname, "./.current_project")}`
      );
      spinner.succeed(`Successfully set project to: ${chalk.bold(env)}`);
    } catch (e) {
      console.error(e);
      spinner.fail(`Failed set project to: ${chalk.bold(env)}`);
    }
  }
})();
