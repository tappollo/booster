import messaging from "@react-native-firebase/messaging";
import {
  checkNotifications,
  requestNotifications
} from "react-native-permissions";
import { PrivateProfile } from "../types";
import DeviceInfo from "react-native-device-info";
import { typedPrivateProfile } from "../user";
import { keyOf } from "./firestoreHooks";
import { NativeModules, Platform } from "react-native";

export const updateToken = async () => {
  if (await DeviceInfo.isEmulator()) {
    return;
  }
  try {
    const { status } = await checkNotifications();
    if (status === "denied") {
      await requestNotifications(["alert", "badge", "sound"]);
    }
    const token =
      Platform.OS === "ios"
        ? await NativeModules.Utils.getToken()
        : await messaging().getToken();
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
