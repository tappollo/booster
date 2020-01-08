import { assertImagePermissions } from "./permissions";
import ImagePicker from "react-native-image-picker";
import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import ImageResizer from "react-native-image-resizer";
import config from "../../app.json";

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
          reject(null);
        }
        if (res.error) {
          analytics().logEvent("selected_image_failed");
          crashlytics().recordError(new Error(res.error));
          reject(new Error(res.error));
        } else {
          analytics().logEvent("selected_image");
          resolve(res.uri);
        }
      }
    );
  });
};

export const resizeLocalImage = async (image: string) => {
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
  return await resizeLocalImage(await pickImage());
};

export const thumbnailImage = (uri: string, width: number, height: number) => {
  return `${config.imageAPI}?url=${encodeURIComponent(
    uri
  )}&width=${width}&height=${height}`;
};
