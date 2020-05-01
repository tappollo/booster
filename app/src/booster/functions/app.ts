import { useEffect } from "react";
import { keyOf } from "./firebase/firestoreHooks";
import { PrivateProfile } from "./types";
import DeviceInfo from "react-native-device-info";
import { currentUserId, typedPrivateProfile } from "./user";
import { useUpdatePing } from "./chat";
import analytics from "@react-native-firebase/analytics";
import AsyncStorage from "@react-native-community/async-storage";
import codePush from "react-native-code-push";
import { logError } from "./utils";
import * as Sentry from "@sentry/react-native";

const registerDeviceInfo = async () => {
  Sentry.setUser({ id: currentUserId() });
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
    registerDeviceInfo().catch(logError);
  }, []);
  useUpdatePing();
};

const checkForCodePushKey = "com.codepush.initialCheck";
export const useWaitForCodePushAfterInstall = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(checkForCodePushKey);
      if (saved === DeviceInfo.getVersion()) {
        setChecked(true);
        return;
      }
      await AsyncStorage.setItem(checkForCodePushKey, DeviceInfo.getVersion());
      const update = await codePush.checkForUpdate();
      if (update == null) {
        setChecked(true);
        return;
      }
      const downloaded = await update.download();
      await downloaded.install(codePush.InstallMode.IMMEDIATE);
    })().catch(() => setChecked(true));
  }, []);
  return checked;
};
