import { Platform, PermissionsAndroid } from "react-native";
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

export const requirePermissions = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.requestMultiple([
      "android.permission.CAMERA",
      "android.permission.WRITE_EXTERNAL_STORAGE"
    ]);
    if (
      granted["android.permission.CAMERA"] !== "granted" ||
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] !== "granted"
    ) {
      throw new Error("imagePicker.permissionDenied");
    }
  }
  return true;
};

export const pickImage = () =>
  new Promise<ImagePickerResponse>((resolve, reject) => {
    ImagePicker.showImagePicker(
      {
        title: "Pick Image",
        cancelButtonTitle: "Cancel",
        chooseFromLibraryButtonTitle: "From Library",
        takePhotoButtonTitle: "Take Photo"
      },
      res => {
        if (res.error) {
          reject(res.error);
        } else {
          resolve(res);
        }
      }
    );
  });

export const resizeImage: (uri: string) => Promise<{ uri: string }> = (
  uri: string
) => ImageResizer.createResizedImage(uri, 1200, 1200, "JPEG", 100);
