import { GithubRelease, RemoteOption } from "./githubAction";
import { run, runRemotely } from "./run";
import * as fs from "fs";
import * as path from "path";

export const deployRemotely = async (
  options: RemoteOption,
  release: GithubRelease
) => {
  const command = `
cd ${options.cwd}
security unlock-keychain -p ${options.password} login.keychain
git reset --hard HEAD
git clean -fd
git fetch --prune --prune-tags
git checkout ${release.tag_name}
yarn install
echo ${JSON.stringify(JSON.stringify(release, null, 2))
    .replace(/\\r/g, "\\\\r")
    .replace(/\\n/g, "\\\\n")} > ./scripts/deploy.json
./scripts/deploy.ts
`;
  console.log(command);
  await runRemotely(command, options);
};

const getLocalReleaseOptions = (): GithubRelease => {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../deploy.json"), {
      encoding: "utf-8"
    })
  );
};

export const deploy = async () => {
  const release = getLocalReleaseOptions();
  const command = `
pushd ../app/ios
bundle install
bundle exec pod install --repo-update
bundle exec fastlane ${release.prerelease ? "internal" : "beta"} tag:${
    release.tag_name
  } changelog:${JSON.stringify(release.body)} > deploy.log
popd

pushd ../app/android
bundle install
bundle exec fastlane ${release.prerelease ? "internal" : "beta"} tag:${
    release.tag_name
  } changelog:${JSON.stringify(release.body)} > deploy.log
popd
  `;
  await run(command);
};
