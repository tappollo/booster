import * as admin from "firebase-admin";
import { usePrivateProfile } from "./profiles";

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
  const profile = await usePrivateProfile(uid).read();
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
