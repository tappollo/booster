import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { PrivateProfile, Profile } from "./types";
import DeviceInfo from "react-native-device-info";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [state, setState] = useState<boolean>();
  useEffect(() => {
    return auth().onAuthStateChanged(async user => {
      setState(user != null);
    });
  }, [setState]);
  return state;
};

const currentUser = () => {
  const user = auth().currentUser;
  if (user == null) {
    throw new Error("User is not logged in");
  }
  return user;
};

export const currentUserId = () => {
  return currentUser().uid;
};

const generateCurrentUserRef = <T>(key: string) => () => {
  return firestore()
    .collection(key)
    .doc(currentUser().uid);
};

export const profileRef = generateCurrentUserRef<Profile>("profile");

export const privateProfileRef = generateCurrentUserRef<PrivateProfile>(
  "private"
);

export const readonlyProfileRef = generateCurrentUserRef<PrivateProfile>(
  "readonly"
);

export const registerDeviceInfo = async () => {
  await privateProfileRef().update(
    "phone",
    currentUser().phoneNumber || undefined
  );
  await privateProfileRef().update(
    (("deviceInfo" as keyof PrivateProfile) +
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

export const updateToken = async () => {
  if (!(await messaging().hasPermission())) {
    await messaging().requestPermission();
  }
  const token = await messaging().getToken();
  await privateProfileRef().update(
    (("pushTokens" as keyof PrivateProfile) +
      "." +
      DeviceInfo.getDeviceId()) as any,
    token
  );
};
