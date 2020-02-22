import { useEffect } from "react";
import { keyOf } from "./firebase/firestoreHooks";
import { PrivateProfile } from "./types";
import DeviceInfo from "react-native-device-info";
import { typedPrivateProfile } from "./user";
import crashlytics from "@react-native-firebase/crashlytics";
import { updateToken } from "./firebase/messaging";
import { useUpdatePing } from "./chat";

const registerDeviceInfo = async () => {
  await typedPrivateProfile
    .ref()
    .update(
      keyOf<PrivateProfile>("deviceInfo") + "." + DeviceInfo.getUniqueId(),
      {
        device: DeviceInfo.getDeviceId(),
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
      console.error(e);
      crashlytics().recordError(e);
    });
  }, []);
  useUpdatePing();
};
