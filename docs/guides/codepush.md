# Code Push Integration

## AppCenter

Go create two project on https://appcenter.ms if you haven't done it already in [internal distribution](internal-distribution.md#appcenter)
Then go to distribute, code-push and `Create standard deployments`

## Terminal

```bash
yarn global add appcenter-cli
appcenter codepush deployment list -k -a YOUR_APPCENTER_APP_NAME
```

You should be able to see something like

| Name       | Key                                   |
| ---------- | ------------------------------------- |
| Production | gn6z_f09Yn7OWIxyX0alVkzWyiGGlg_uWXGN1 |
| Staging    | HQFJgm2JSRzqgFVGLJ9DKaMMRIJLx-1YKfeVa |

Do it for both android and iOS app

Then replace

- `PHARAH_IOS_CODEPUSH_KEY` in `/scripts/configs/dev/Info.plist`
- `PHARAH_ANDROID_CODEPUSH_KEY` in `/scripts/configs/dev/strings.xml`

Generate code signing

Read more here https://github.com/Microsoft/code-push/tree/master/cli#code-signing

```bash
cd app
openssl genrsa -out codepushsign.pem
openssl rsa -pubout -in codepushsign.pem -out codepushsignpublic.pem
cat codepushsignpublic.pem | pbcopy
```

Then replace `PHARAH_CODE_PUSH_CERT_PEM` in `/scripts/configs/dev/Info.plist' and`/scripts/configs/dev/strings.xml`.

Finally replace `PHARAH_IOS_APPCENTER_PROJECT` and `PHARAH_ANDROID_APPCENTER_PROJECT` in `app/package.json` run `yarn use dev` and you're good to go.

All the step for [native library](https://github.com/microsoft/react-native-code-push#getting-started) has been setup for you.

When you need to distribute OTA updates, just do `yarn codepush:ios` and `yarn codepush:android` in `app` folder.

> P.S. OTA updates apply to matching build version. e.g. `1.0` will match `1.0.*`
> more detail here https://github.com/Microsoft/code-push/tree/master/cli#target-binary-version-parameter
> to push mandatory updates use `yarn codepush:ios -m`
