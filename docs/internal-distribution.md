# Internal Distribution

When it comes distribute our builds to QAs, there are usually two options.

1. Internal build distribution with AppCenter, Hockey apps
1. Official channels like Apple Test Flight and Google Play store's internal track.

Where often the official channel takes longer
whether it's because their is a review process or simply because they need to
do extra processing on the build you've uploaded.

So for faster feedback loop, we usually opt-in for the first option with internal distributions.

And since HockeyApp will be deprecated soon, we switched to uses AppCenter instead.

Beside, we are also use CodePush from AppCenter later in the project.

## AppCenter

Go to https://appcenter.ms/apps and create two apps, `goboost-ios` and `goboost-android`.

For both iOS and android project, go to distribution tab and create a Distribution groups called **Public**. Select `is_public`,
This way we don't need our QAs to sign up in AppCenter just to access the builds. The build provisioning is all done by ourselves.

Replace

- PHARAH_APPCENTER_API_TOKEN (obtained from https://appcenter.ms/settings/apitokens)
- PHARAH_APPCENTER_OWN_NAME (e.g. zhigang1992-4byv)
- PHARAH_APPCENTER_APP_NAME

In

- app/ios/fastlane/Fastfile
- app/android/fastlane/Fastfile

## iOS signing

To distribute iOS app, you would need to apply for **Apple Developer Program** https://developer.apple.com/programs/

We use `fastlane match` to manage our dev certs, go set it up with https://docs.fastlane.tools/actions/match/

Afterwards, replace

- PHARAH_APPLE_DEV_ID e.g. `team@tappollo.com`
- PHARAH_APPLE_DEV_ITC_TEAM e.g. `118131407` from AppStore Connect
- PHARAH_APPLE_DEV_TEAM e.g. `835BXF96BF` from Apple Develop Portal
- PHARAH_APPLE_MATCH_CERT_REPO e.g. The private repo you set in previous step

In

- app/ios/fastlane/Appfile
- app/ios/fastlane/Matchfile

### Create app in Apple develop portal

```bash
bundle exec fastlane produce -u team@tappollo.com -a com.goboost --skip_itc
bundle exec fastlane produce enable_services --push-notification
```

### Enable Push Notifications

```bash
bundle exec fastlane pem
bundle exec fastlane pem --development
```

Upload these two set of cert to firebase console under project settings, Cloud Messages

## android signing

In folder `app/android` run

```bash
keytool -genkey -v -keystore ./keystores/release.keystore -alias key -keyalg RSA -keysize 2048 -validity 10000
```

Then edit `app/android/app/build.gradle`

Replace the `PHARAH_ANDROID_STORE_PASSWORD` and `PHARAH_ANDROID_KEY_PASSWORD` with the ones you input in the step above

To get SHA1 from this newly generated keystore, run

```bash
keytool -list -v -keystore ./keystores/release.keystore
```

And copy the value after SHA1, go to firestore console,
in project settings under **Your apps**, **Add fingerprint**
paste in the SHA1 value you just copied.

This step is required for accessing some firebase feature like Phone Auth and Google SignIn.

## Release build

In `app/ios` or `app/android`

```bash
bundle exec fastlane ios appcenter
bundle exec fastlane android appcenter
```

The build number is always calculated by current [number_of_commits](https://docs.fastlane.tools/actions/number_of_commits/)
