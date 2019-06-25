declare module "replace-in-file" {
  interface ReplaceInFileOptions {
    from: string | RegExp;
    to: string;
    files: string | string[];
  }
  declare function ReplaceInFileOptions(
    opts: ReplaceInFileOptions
  ): Promise<string[]>;
  export = ReplaceInFileFunc;
}
