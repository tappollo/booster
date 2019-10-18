import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { TypedCollectionReference } from "./firebase/firestore";
import { FirestoreCollectionTypes, PrivateProfile } from "./types";
import DeviceInfo from "react-native-device-info";

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

export const generateCollection = <K extends keyof FirestoreCollectionTypes>(
  key: K
): TypedCollectionReference<FirestoreCollectionTypes[K]> => {
  return firestore().collection(key);
};

const generateCurrentUserRef = <K extends keyof FirestoreCollectionTypes>(
  key: K
) => () => {
  return generateCollection(key).doc(currentUser().uid);
};

export const profileRef = generateCurrentUserRef("profile");
export const privateProfileRef = generateCurrentUserRef("private");
export const readonlyProfileRef = generateCurrentUserRef("readonly");

export const registerDeviceInfo = async () => {
  await privateProfileRef().update(
    "phone",
    currentUser().phoneNumber || undefined
  );
  await privateProfileRef().update(
    (("deviceInfo" as keyof PrivateProfile) +
      "." +
      DeviceInfo.getDeviceIdSync()) as any,
    {
      deviceName: DeviceInfo.getDeviceNameSync(),
      binaryVersion: DeviceInfo.getVersionSync(),
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
      DeviceInfo.getDeviceIdSync()) as any,
    token
  );
};
