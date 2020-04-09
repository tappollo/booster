# Project Booster

> develop native apps for all platforms in half the time and half the manpower

## What it is

Scaffolding code, prebuilt UI components and integrated Cl/CD (continuous integration/continuous delivery) for rapid development in iOS, Android and web. Booster helps you develop native apps for all platforms in half the time and half the manpower.

See the [Documentation](https://tappollo.github.io/booster/) guide for more details.

## Features

- Fully functional app in minutes
- The Power of Native Web
- Over the air update
- Prebuilt components
- CI/CD integrations
- Scalability, analytics, A/B testing, crash reporting from day one

## Build process

You need:

- yarn
- node 10 `v10.15.1`. (firebase cloud function only support up to v10)
  > if you're using node version higher than 10, you need to do `yarn config set ignore-engines true` to prevent cloud function from complaining
- ruby `2.6.5` for fastlane and CocoaPods (with bundler)

### Steps

```shell script
yarn bootstrap
yarn firebase login # if not already, you need to have access to the firebase project
yarn use dev # or prod, example
cd app
yarn start
npx react-native run-ios
npx react-native run-android
```
