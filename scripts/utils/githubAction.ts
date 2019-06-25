import * as process from "process";
import * as fs from "fs";

export const isInGithubAction = () => {
  return process.env.GITHUB_EVENT_PATH != null;
};

export interface GithubRelease {
  body: string;
  tag_name: string;
  prerelease: boolean;
}

export const getRelease = (): {
  body: string;
  tag_name: string;
  prerelease: boolean;
} => {
  if (!process.env.GITHUB_EVENT_PATH) {
    throw new Error("GITHUB_EVENT_PATH not exist");
  }

  const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, {
      encoding: "utf-8"
    })
  );

  const { body, tag_name, prerelease } = event.release;
  return {
    body,
    tag_name,
    prerelease
  };
};

export interface RemoteOption {
  user: string;
  password: string;
  host: string;
  port: string;
  cwd: string;
}

export const getRemoteOptions = (): RemoteOption =>
  ({
    cwd: process.env.MAC_PROJECT_PATH,
    user: process.env.MAC_USERNAME,
    password: process.env.MAC_PASSWORD,
    host: process.env.MAC_HOST,
    port: process.env.MAC_PORT
  } as any);
