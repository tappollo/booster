## AppStore Release

To build for release, you need to setup [iOS signing](guides/internal-distribution.md#ios-signing) first.

```bash
cd app/ios
bundle exec beta tag:0.0.1 changelog:"AppStore Release"
```

This will create a store build and submit it to AppStore, this will take up to 1 hour for AppStore to process.

After which it will be available for TestFlight testing, or AppStore releases directly.

## PlayStore Release

To build for release, you need to setup [android Signing](guides/internal-distribution.md#android-signing) first.

```bash
cd app/android
bundle exec beta tag:0.0.1 changelog:"Initial PlayStore Release"
```

This will create a [Android App Bundle](https://developer.android.com/guide/app-bundle) in `app/android/app/build/outputs/bundle/release/app.aab`

Login to PlayStore and release this bundle to either testing or production tracks.

If you have the admin access to [Collect your Google credentials](https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials)
you can [automate this process](https://docs.fastlane.tools/getting-started/android/release-deployment/) too.
