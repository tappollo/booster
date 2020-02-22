import messaging from "@react-native-firebase/messaging";
import {
  checkNotifications,
  requestNotifications
} from "react-native-permissions";
import { PrivateProfile } from "../types";
import DeviceInfo from "react-native-device-info";
import { typedPrivateProfile } from "../user";
import { keyOf } from "./firestoreHooks";

export const updateToken = async () => {
  const { status } = await checkNotifications();
  if (status === "denied") {
    await requestNotifications(["alert", "badge", "sound"]);
  }
  try {
    const token = await messaging().getToken();
    await typedPrivateProfile
      .ref()
      .update(
        keyOf<PrivateProfile>("pushTokens") + "." + DeviceInfo.getUniqueId(),
        token
      );
  } catch (e) {
    console.log(e);
  }
};
