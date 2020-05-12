#!/usr/bin/env ts-node

import * as config from "./build.json";
import { version } from "./package.json";
import { execSync } from "child_process";

function deployPlatform(target: "ios" | "android", extraArgs: string) {
  const { app_name, code_push_env, owner_name } = config.appcenter[target];

  const hash = execSync("git rev-parse HEAD").toString().trim();
  const count = execSync("git rev-list --count HEAD").toString().trim();

  const release = `${version}-${count}-${hash.slice(0, 5)}`;

  execSync("rm -rf ./build/CodePush");

  execSync(
    `appcenter codepush release-react --extra-bundler-option="--reset-cache" --sourcemap-output --output-dir ./build -a ${owner_name}/${app_name} -k codepushsign.pem -d ${code_push_env} -t ${version} ${extraArgs}`,
    { cwd: __dirname, stdio: "inherit" }
  );

  execSync(
    `./node_modules/.bin/sentry-cli react-native appcenter ${owner_name}/${app_name} ${target} ./build/CodePush --release-name '${release}' --deployment ${code_push_env}`,
    {
      cwd: __dirname,
      stdio: "inherit",
      env: {
        ...process.env,
        SENTRY_PROPERTIES: `./${target}/sentry.properties`,
      },
    }
  );
}

const platform = process.argv[2]?.toLowerCase() as "ios" | "android" | "all";

const extraArgs = process.argv.slice(3).join(" ");

if (!["ios", "android", "all"].includes(platform)) {
  console.log("./publishCodePush.ts ios|android|all");
  process.exit(1);
}

if (platform !== "android") {
  deployPlatform("ios", extraArgs);
}

if (platform !== "ios") {
  deployPlatform("android", extraArgs);
}
