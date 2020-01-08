import messaging from "@react-native-firebase/messaging";
import { PrivateProfile } from "../types";
import DeviceInfo from "react-native-device-info";
import { privateProfileRef } from "../user";
import { keyOf } from "./firestore";

export const updateToken = async () => {
  if (!(await messaging().hasPermission())) {
    await messaging().requestPermission();
  }
  const token = await messaging().getToken();
  await privateProfileRef().update(
    (keyOf<PrivateProfile>("pushTokens") +
      "." +
      DeviceInfo.getDeviceId()) as any,
    token
  );
};
