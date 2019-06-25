#!./node_modules/.bin/ts-node

import chalk from "chalk";
import * as meow from "meow";
import ora from "ora";
import * as fs from "fs-extra";
import replace = require("replace-in-file");
import * as path from "path";

const cli = meow(
  `
	Usage
	  $ ./Starting_over_from_the_beginning.ts

	Examples
	  $ ./Starting_over_from_the_beginning.ts awesome
	  
  ${chalk.bold("Heroes never die!")}
`
);

const relative = (location: string) => path.resolve(__dirname, location);

const replaceInFiles = async (to: string) => {
  await replace({
    from: /mercy/g,
    to,
    files: [relative("../**"), relative("../**/.*"), relative("../.github/**")],
    ignore: [
      relative("../node_modules/**"),
      relative("../*/node_modules/**"),
      relative("../app/ios/Pods/**"),
      relative("./Starting_over_from_the_beginning.ts")
    ]
  });
};

const renameFiles = async (dir: string, to: string) => {
  for (const filename of await fs.readdir(dir)) {
    if ([".git", "node_modules", "Pods", "build"].includes(filename)) {
      continue;
    }
    const filePath = path.resolve(dir, filename);
    const file = await fs.stat(filePath);
    if (file.isDirectory()) {
      await renameFiles(filePath, to);
    }
    if (filename.includes("mercy")) {
      await fs.rename(
        filePath,
        path.resolve(dir, filename.replace("mercy", to))
      );
    }
  }
};

(async () => {
  if (!cli.input[0]) {
    cli.showHelp();
  } else {
    const spinner = ora("Renaming Project").start();
    try {
      const name = cli.input[0];
      await replaceInFiles(name);
      await renameFiles(relative("../"), name);
      spinner.succeed(`Renamed to ${name}`);
    } catch (e) {
      spinner.fail(e.message);
    }
  }
})();
