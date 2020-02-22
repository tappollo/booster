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
  if (profile.pushTokens == null) {
    return;
  }
  const tokens = Object.values(profile.pushTokens);
  if (tokens.length === 0) {
    return;
  }
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: notifications.title,
      body: notifications.body,
      sound: "default"
    }
  };
  if (notifications.badge) {
    payload.notification!.badge = notifications.badge.toString();
  }
  if (notifications.data) {
    payload.data = notifications.data;
  }
  await admin.messaging().sendToDevice(tokens, payload, {
    priority: "high"
  });
};
