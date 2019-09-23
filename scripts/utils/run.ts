import { exec } from "child_process";

export const run = (command: string) =>
  new Promise((ful, rej) => {
    const { stdout } = exec(command, (error, _, stderr) => {
      if (stderr) {
        console.log(stderr);
      }
      if (error) {
        rej(error);
      } else {
        ful();
      }
    });
    if (stdout) {
      stdout.pipe(process.stdout);
    }
  });
