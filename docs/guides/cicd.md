# CI / CD with Github Actions

To enable test on each push.

Rename `.github/workflows/ci.yml.bak` to `.github/workflows/ci.yml` (Dropping the .bak).

This will run:

- Unit tests
- TypeScript Checks
- Eslint Checks

## CD

### Push development build to App center

First, you need to [setup signing](internal-distribution.md#ios-signing),
then create a ssh-key pair and add it to Deployment keys of your fastlane match repo
(We need to download those certs and provisioning profiles for signing).

After which, add the newly generated private key to your github repo's secrete under key `MATCH_REPO_SSH_PRIVATE_KEY`.

And `MATCH_PASSWORD` for repo decrypt password and `FASTLANE_PASSWORD` for apple id password.

> On CI, fastlane match is run under `readonly` mode. It will not make any changes to the repo.

Then add `FIREBASE_TOKEN` to secrete by running `firebase login:ci` on your local machine.

## Slack Integration

We recommend using https://slack.github.com to trigger deployments,
if you don't use slack, there are [other ways](https://developer.github.com/v3/guides/delivering-deployments/) to trigger deployments as well.

After setup, run

```bash
/github deploy repo/name
```

It will bring up a dialog asking for `branchs`, `environments` and `task`.

environment is the same as the one we use under `yarn use`, e.g `dev`, `prod`.

If `task` is left blank, it will deploy both iOS and android, or you can specify which platform to deploy only.
