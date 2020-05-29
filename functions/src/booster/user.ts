import * as functions from "firebase-functions";
import {
  usePrivateProfile,
  useReadonlyProfile,
  useUserProfile,
} from "./utils/profiles";
import { promoteToAdminPassword } from "../server.json";
import { assertNotNull, assertString } from "./utils/utils";
import { HttpsError } from "firebase-functions/lib/providers/https";
import * as admin from "firebase-admin";
import { sendNotificationsTo } from "./utils/notifications";

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  console.log(
    `User created: ${user.uid} from ${JSON.stringify(user.providerData)}`
  );
  // setup for user
  await useUserProfile(user.uid).update({
    name: user.displayName,
    avatar: user.photoURL,
    email: user.email,
  });

  await usePrivateProfile(user.uid).update({
    phone: user.phoneNumber,
  });

  await useReadonlyProfile(user.uid).update({
    accountBalance: 0,
    behaviorScore: 0,
  });
});

export const onUserDelete = functions.auth.user().onDelete(async (user) => {
  // Clean up user
  await useUserProfile(user.uid).delete();
  await usePrivateProfile(user.uid).delete();
  await useReadonlyProfile(user.uid).delete();
});

export const promoteToAdmin = functions.https.onCall(async (data, context) => {
  assertNotNull(context.auth);
  const { password } = data;
  assertString(password);
  if (password !== promoteToAdminPassword) {
    throw new HttpsError("permission-denied", "wrong password");
  }
  await admin.auth().setCustomUserClaims(context.auth.uid, {
    isAdmin: true,
  });
});

export const sendTestNotification = functions.https.onCall(
  async (_, context) => {
    assertNotNull(context.auth);
    await new Promise((res) => setTimeout(res, 5 * 1000));
    const error = await sendNotificationsTo(context.auth.uid, {
      title: "Test is a test notification",
      body:
        "If you are getting this, it means your notification is working fine",
    });
    if (error != null) {
      throw new HttpsError("internal", error.message);
    }
  }
);
