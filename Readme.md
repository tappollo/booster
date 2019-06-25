> This project is still in very active development, proceed with caution.

### Getting Started:

#### Dependencies

We are using these tools in dev&ops, please make sure they are preinstalled

> 1. Ruby, please note you'll need to manually install `ruby` since `macOS Catalina`
> 2. `bundler` https://bundler.io/
> 3. `yarn`&`npm`, we are using `yarn workspace` and `patch package` in this project
> 4. `fastlane` https://fastlane.tools/
> 5. `cocoapods` https://cocoapods.org/

Make sure each individual tool is installed on your environment
Alone side these tools, ofcause, `xcode`&`Android Studio` is need.

#### Up and running

1. clone these repo.
2. run the script `Starting_over_from_the_beginning.ts` inside the `scripts` folder
3. make sure your firebase is properly configured (see below)
4. we put sevral initial config files in to dedicated folder (scripts/config) to do env management, so make sure they are configured properly.
5. run `yarn` in the root folder and `yarn start` at the `app` folder.
   > note that each folder may have it's dedicated `package.json` file, consult the official documentation for `yarn workspace` for details

### Integrated Features

We have some preconfig files inside the `scripts/configs` folder as listed below

1. scripts/configs/dev/google-services.json
2. scripts/configs/dev/GoogleService-Info.plist
3. scripts/configs/dev/adminsdk.json
4. scripts/configs/dev/Info.plist
   Make sure you download them from your firebase console or config them properly.

#### Firebase integration

1. Firebase firestore
2. Firebase functions
3. Firebase storage
4. Firebase host
   these service is currently included in this project, access them from each sub directry.

#### For iOS Setup

config your bundle id & team id from these places:

> 1. Info.plist
> 2. xcode project settings
> 3. app/ios/fastlane/Appfile
>    also, config your own certificate repo for fastlane/match, for more information about this, consult the faastlane documentation.

#### For Android Setup

#### Signup & Login

1. Enable `Phone/Email/Password Login` in firebase console: Authentication Method Panel
2. For social login see below

#### For Social Auth Configraions:

##### [Facebook](https://github.com/ticketchain/yellowheart-ios/wiki/Social-Integration)

1. Enable [IAM](https://console.cloud.google.com/project/_/iam-admin) Service Account API in Google Cloud Platform Console.
2. Grant the `Service Account Token Creator` IAM role to the service account
   > 1. Open the IAM and admin page in the Google Cloud Platform Console.
   > 2. Select your project and click "Continue".
   > 3. Click the edit icon corresponding to the service account ID you wish to update.
   > 4. Click on "Add Another Role".
   > 5. Type "Service Account Token Creator" into the search filter, and select it from the results.
   > 6. Click "Save" to confirm the role grant.

The Service Account name is currently `App Engine default service account` might change when firebase functions upgrade (Undocumented now).

##### [Google](https://github.com/ticketchain/yellowheart-ios/wiki/Social-Integration)

1. Enable `Phone/Email/Password Login` in firebase console: Authentication Method Panel
2. Enable [IAM](https://console.cloud.google.com/project/_/iam-admin) Service Account API in Google Cloud Platform Console.
3. Grant the `Service Account Token Creator` IAM role to the service account
   > 1. Open the IAM and admin page in the Google Cloud Platform Console.
   > 2. Select your project and click "Continue".
   > 3. Click the edit icon corresponding to the service account ID you wish to update.
   > 4. Click on "Add Another Role".
   > 5. Type "Service Account Token Creator" into the search filter, and select it from the results.
   > 6. Click "Save" to confirm the role grant.

The Service Account name is currently `App Engine default service account` might change when firebase functions upgrade (Undocumented now).

##### Push Notifications

#####

### UI Components

#### Navigation structrue

- [React Navigation](https://github.com/ticketchain/yellowheart-ios/wiki/Social-Integration)

##### Firebase

1. Enable `Facebook Login` in firebase console: Authentication Method Panel
2. Enable [IAM](https://console.cloud.google.com/project/_/iam-admin) Service Account API in Google Cloud Platform Console.
3. Grant the `Service Account Token Creator` IAM role to the service account
   > 1. Open the IAM and admin page in the Google Cloud Platform Console.
   > 2. Select your project and click "Continue".
   > 3. Click the edit icon corresponding to the service account ID you wish to update.
   > 4. Click on "Add Another Role".
   > 5. Type "Service Account Token Creator" into the search filter, and select it from the results.
   > 6. Click "Save" to confirm the role grant.

The Service Account name is currently `App Engine default service account` might change when firebase functions upgrade (Undocumented now).

#### Images management

##### Backend Configuration

- [Firebase Functions](https://github.com/ticketchain/yellowheart-ios/wiki/Social-Integration)
- [Firebase Storage](https://github.com/ticketchain/yellowheart-ios/wiki/Social-Integration)

#### UI Elements

##### Layouts

##### Vector Icons

##### Typography

##### Buttons

##### Forms

##### Video
