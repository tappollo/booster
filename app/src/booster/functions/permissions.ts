import { Platform } from "react-native";
import {
  check,
  Permission,
  PERMISSIONS,
  request,
} from "react-native-permissions";
import analytics from "@react-native-firebase/analytics";

export const assertPermission = async ({
  ios,
  android,
  message,
}: {
  ios: Permission;
  android: Permission;
  message: string;
}) => {
  const permission = Platform.select({
    android,
    default: ios,
  });
  const current = await check(permission);
  if (current === "granted") {
    return;
  }
  const requested = await request(permission);
  if (
    current === "blocked" ||
    requested === "blocked" ||
    requested === "denied"
  ) {
    analytics().logEvent("user_denied_permission", { permission });
    throw new Error(message);
  }
};

export const assertImagePermissions = async () => {
  await assertPermission({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
    message: "Need your camera access",
  });
  await assertPermission({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    message: "Need your photo library access",
  });
};

export const assertLocationPermission = async () => {
  await assertPermission({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    message: "Need your location access",
  });
};
