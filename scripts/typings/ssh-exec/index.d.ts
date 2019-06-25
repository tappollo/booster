declare module "ssh-exec" {
  import { Readable } from "node";
  export interface SshExecOptions {
    user: string;
    password: string;
    host: string;
    port: string;
  }
  declare function ExecRemoteFunction(
    command: string,
    options: SshExecOptions,
    callback: (
      error: Error | undefined,
      stdout: string | undefined,
      stderr: string | undefined
    ) => void
  ): Readable;
  export = ExecRemoteFunction;
}
