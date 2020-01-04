import storage from "@react-native-firebase/storage";
import { currentUserId } from "./user";
import uuid from "uuid/v4";
import { assertImagePermissions } from "./permissions";
import ImagePicker from "react-native-image-picker";
import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import ImageResizer from "react-native-image-resizer";

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

const pickImage = async () => {
  return await new Promise<string>((resolve, reject) => {
    analytics().logEvent("start_select_image");
    ImagePicker.showImagePicker(
      {
        noData: true
      },
      res => {
        if (res.didCancel) {
          analytics().logEvent("cancel_select_image");
          throw null;
        }
        if (res.error) {
          analytics().logEvent("selected_image_failed");
          crashlytics().recordError(new Error(res.error));
          reject(res.error);
        } else {
          analytics().logEvent("selected_image");
          resolve(res.uri);
        }
      }
    );
  });
};

export const resizeImage = async (image: string) => {
  const { uri } = await ImageResizer.createResizedImage(
    image,
    2000,
    2000,
    "JPEG",
    90
  );
  return uri;
};

export const selectImage = async (): Promise<string> => {
  await assertImagePermissions();
  return await uploadFile(await resizeImage(await pickImage()));
};
