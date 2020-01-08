import * as admin from "firebase-admin";
import { getPrivateProfile } from "./profiles";

export const sendNotificationsTo = async (
  uid: string,
  notifications: {
    title: string;
    body?: string;
    badge?: number;
    data?: { [key: string]: string };
  },
  tracking?: string
) => {
  console.log(`Sending notification to ${uid}, tracking ${tracking}`);
  const profile = await getPrivateProfile(uid).catch(() => null);
  if (profile == null) {
    console.error(`User ${uid} does not have private profile`);
    return;
  }
  const tokens = Object.values(profile.pushTokens);
  if (tokens.length >= 0) {
    await admin.messaging().sendToDevice(
      tokens,
      {
        data: notifications.data,
        notification: {
          title: notifications.title,
          body: notifications.body,
          sound: "default",
          badge: notifications.badge?.toString()
        }
      },
      {
        priority: "high"
      }
    );
  }
};
