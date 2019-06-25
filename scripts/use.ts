#!./node_modules/.bin/ts-node

import chalk from "chalk";
import * as meow from "meow";
import ora from "ora";
import * as path from "path";
import { run } from "./utils/run";
import * as fs from "fs-extra";
import * as process from "process";

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
      await fs.remove("../app/ios/GoogleService-Info.plist");
      await fs.remove("../app/android/app/google-services.json");
      await fs.remove("../app/ios/mercy/Info.plist");
      await fs.remove("../functions/src/adminsdk.json");
      await fs.ensureSymlink(
        `./configs/${env}/GoogleService-Info.plist`,
        `../app/ios/GoogleService-Info.plist`
      );
      await fs.ensureSymlink(
        `./configs/${env}/google-services.json`,
        `../app/android/app/google-services.json`
      );
      await fs.ensureSymlink(
        `./configs/${env}/Info.plist`,
        `../app/ios/mercy/Info.plist`
      );
      await fs.ensureSymlink(
        `./configs/${env}/adminsdk.json`,
        `../functions/src/adminsdk.json`
      );
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
