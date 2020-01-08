import { useEffect } from "react";
import { keyOf } from "./firebase/firestore";
import { PrivateProfile } from "./types";
import DeviceInfo from "react-native-device-info";
import { currentUser, privateProfileRef } from "./user";
import crashlytics from "@react-native-firebase/crashlytics";
import { updateToken } from "./firebase/messaging";
import { useUpdatePing } from "./chat";

const registerDeviceInfo = async () => {
  await privateProfileRef().update(
    keyOf<PrivateProfile>("phone"),
    currentUser().phoneNumber || undefined
  );
  await privateProfileRef().update(
    (keyOf<PrivateProfile>("deviceInfo") +
      "." +
      DeviceInfo.getDeviceId()) as any,
    {
      deviceName: DeviceInfo.getDeviceNameSync(),
      binaryVersion: DeviceInfo.getVersion(),
      os: DeviceInfo.getBaseOsSync(),
      lastOpen: new Date()
    }
  );
};

export const useAppLaunchAfterLogin = () => {
  useEffect(() => {
    console.log("App Launched after logged in");
    Promise.all([registerDeviceInfo(), updateToken()]).catch(e => {
      crashlytics().recordError(e);
    });
  }, []);
  useUpdatePing();
};
