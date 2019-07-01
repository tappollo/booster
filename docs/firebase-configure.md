# Setup Firebase

### Create project

Go to firebase console: https://console.firebase.google.com/ and click on **Add Project**

Replace `PHARAH_FIREBASE_PROJECT` in `.firebaserc` with the **Project ID** from that new project.

```json
{
  "projects": {
    "dev": "PHARAH_FIREBASE_PROJECT",
    "staging": "PHARAH_FIREBASE_PROJECT",
    "prod": "PHARAH_FIREBASE_PROJECT"
  }
}
```

For starter, you can only replace the `dev` one.

### Create iOS app

Go to your firebase project's Dashboard, can click on **Add App**, add an iOS app.

In iOS bundle ID, put in `com.goboost` with `goboost` replaced with your own project name.

All the setup has already been done for you, skip the last step.

Place the downloaded `GoogleService-Info.plist` under `scripts/configs/dev/`

Open `scripts/configs/dev/GoogleService-Info.plist` and copy the value of key `REVERSED_CLIENT_ID`

Open `scripts/configs/dev/Info.plist` and replace `PHARAH_GOOGLE_REVERSE_DOMAIN` in with the value your copied

![Edit Info Plist](_images/edit-google-client-id-in-infoplist.png)

!> Never edit the Info.plist in Xcode project directly, that’s just a temporary file
