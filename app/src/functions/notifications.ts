import { firestore, messaging } from "react-native-firebase";
import { currentUser } from "./auth";
import DeviceInfo from "react-native-device-info";

export const requestAndUploadToken = async () => {
  const enabled = await messaging().hasPermission();
  if (!enabled) {
    await messaging().requestPermission();
  }
  const fcmToken = await messaging().getToken();
  console.log(fcmToken);
  await firestore()
    .collection("users")
    .doc(currentUser().uid)
    .collection("devicesToken")
    .doc(DeviceInfo.getUniqueID())
    .set({
      token: fcmToken,
      model: DeviceInfo.getModel(),
      name: DeviceInfo.getDeviceName()
    });
};
