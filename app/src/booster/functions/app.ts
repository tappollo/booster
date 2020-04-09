import { useEffect } from "react";
import { keyOf } from "./firebase/firestoreHooks";
import { PrivateProfile } from "./types";
import DeviceInfo from "react-native-device-info";
import { currentUserId, typedPrivateProfile } from "./user";
import crashlytics from "@react-native-firebase/crashlytics";
import { updateToken } from "./firebase/messaging";
import { useUpdatePing } from "./chat";
import analytics from "@react-native-firebase/analytics";

const registerDeviceInfo = async () => {
  crashlytics().setUserId(currentUserId());
  analytics().setUserId(currentUserId());
  await typedPrivateProfile
    .ref()
    .update(
      keyOf<PrivateProfile>("deviceInfo") + "." + DeviceInfo.getUniqueId(),
      {
        device: DeviceInfo.getDeviceId(),
        deviceName: await DeviceInfo.getDeviceName(),
        binaryVersion: DeviceInfo.getVersion(),
        os: await DeviceInfo.getBaseOs(),
        lastOpen: new Date(),
      }
    );
};

export const useAppLaunchAfterLogin = () => {
  useEffect(() => {
    console.log("App Launched after logged in");
    Promise.all([registerDeviceInfo(), updateToken()]).catch((e) => {
      console.error(e);
      crashlytics().recordError(e);
    });
  }, []);
  useUpdatePing();
};
