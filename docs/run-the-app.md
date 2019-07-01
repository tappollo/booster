# Run the app

Switch to dev env

```bash
yarn deploy:dev
```

## Run react-native packager

```bash
cd app
yarn start
```

## Run iOS app

To run iOS app, you'd need ruby for both [CocoaPods](https://cocoapods.org/) and [fastlane](https://fastlane.tools/),
we recommend setup [rbenv](https://github.com/rbenv/rbenv) since it respects our `.ruby-version` on project root.

After which you need to run

```bash
cd app/ios
gem install bundler
bundle
bundle exec pod install --repo-update
```

Then `yarn xcode` to open up Xcode and Run the app in simulator.

## Run android app

To run android app, you need java 1.8.

You can install it with

```bash
brew cask install java8
```

Or manually from https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

After which, run `yarn studio` to open up Android Studio. and use all the default options to setup project.

Then it's best to [Configure signing for android](internal-distribution.md#android-signing)

Then start up the app in Android Studio.
