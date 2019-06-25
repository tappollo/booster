import { exec } from "child_process";
import execRemote = require("ssh-exec");
import * as path from "path";

export const run = (command: string) =>
  new Promise((ful, rej) => {
    const { stdout } = exec(
      command,
      { cwd: path.resolve(__dirname, "..") },
      (error, _, stderr) => {
        if (stderr) {
          console.log(stderr);
        }
        if (error) {
          rej(error);
        } else {
          ful();
        }
      }
    );
    if (stdout) {
      stdout.pipe(process.stdout);
    }
  });

export const runRemotely = (
  command: string,
  options: execRemote.SshExecOptions
) =>
  new Promise((ful, rej) => {
    execRemote(command, options, (error, _, stderr) => {
      if (error) {
        console.log(stderr);
        console.log(error.message);
        rej(error);
      } else {
        ful();
      }
    }).pipe(process.stdout);
  });
