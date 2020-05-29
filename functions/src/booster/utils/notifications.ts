import * as admin from "firebase-admin";
import { usePrivateProfile } from "./profiles";
import { NotificationData } from "../../types";

export const sendNotificationsTo = async (
  uid: string,
  notifications: {
    title: string;
    body?: string;
    badge?: number;
    data?: NotificationData;
  },
  tracking?: string
) => {
  console.log(`Sending notification to ${uid}, tracking ${tracking}`);
  try {
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
        body: notifications.body ?? notifications.title,
        sound: "default",
      },
      data: {
        title: notifications.title || "",
        body: notifications.body || "",
        ...notifications.data,
      },
    };
    if (notifications.badge) {
      payload.notification!.badge = notifications.badge.toString();
    }
    await admin.messaging().sendToDevice(tokens, payload, {
      priority: "high",
      contentAvailable: true,
    });
  } catch (e) {
    console.error(e);
    return e;
  }
};
