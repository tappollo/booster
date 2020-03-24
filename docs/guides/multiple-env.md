# Multiple Environment setup

For reason on having multiple envs, [here](https://reily.app/posts/2019-03-07/firebase-env-switching/)

These will be a step by step guide on adding `Prod` env to your booster project.

To get started, we usually duplicate whatever we have in `scripts/configs/dev` to `scripts/configs/prod`.

### Create firebase project

Go to https://console.firebase.google.com and add a new project, we recommend name it `goboost-prod`
(where goboost is your project name).

Do everything in [Setup firebase](start/firebase-configure.md) but replace `dev` with `prod`.

And don't forget to upload the same [APNs keys](guides/internal-distribution.md#enable-push-notifications) to this project as well.

Edit `.firebaserc` and replace the value for `prod`.

### Add codepush production env

Do everything in [Setup CodePush](guides/codepush.md) but replace `dev` with `prod`,
also you should use `Production` instead of `Staging` on codepush keys.

### Configs

Change the values in `scripts/configs/server.json` and `scripts/configs/app.json`.

## Switch to prod

```bash
yarn use prod
```
