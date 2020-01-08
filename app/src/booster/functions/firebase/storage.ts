import analytics from "@react-native-firebase/analytics";
import storage from "@react-native-firebase/storage";
import { currentUserId } from "../user";
import uuid from "uuid/v4";
import crashlytics from "@react-native-firebase/crashlytics";

export const uploadFile = async (
  filePath: string,
  contentType: string = "image/png"
) => {
  analytics().logEvent("upload_file", { path: filePath, type: contentType });
  const ref = storage().ref(`users/${currentUserId()}/${uuid()}`);
  const snapshot = await ref.putFile(filePath, {
    cacheControl: "max-age=31536000",
    contentType
  });
  if (snapshot.state !== "success" && snapshot.error != null) {
    analytics().logEvent("upload_file_failed", {
      path: filePath,
      type: contentType
    });
    crashlytics().recordError(snapshot.error as any);
    throw new Error("Unable to get download link");
  }
  analytics().logEvent("upload_file_succeed", {
    path: filePath,
    type: contentType
  });
  return await ref.getDownloadURL();
};
