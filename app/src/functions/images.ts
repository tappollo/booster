import { PermissionsAndroid, Platform } from "react-native";
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { firestore, storage } from "react-native-firebase";
import { currentUser } from "./auth";

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

export const resizeImage = async (image: string) => {
  const { uri } = await ImageResizer.createResizedImage(
    image,
    1200,
    1200,
    "JPEG",
    100
  );
  return uri;
};

const uploadImage = async (
  image: string,
  contentType: string = "image/png"
) => {
  const id = firestore()
    .collection("images")
    .doc().id;
  const snapshot = await storage()
    .ref(`users/${currentUser().uid}/${id}`)
    .putFile(image, {
      cacheControl: "max-age=31536000",
      contentType
    });
  if (!snapshot.downloadURL) {
    throw new Error("Unable to get download link");
  }
  return snapshot.downloadURL;
};

export const checkPermissionAndPickImage = async () => {
  await requirePermissions();
  return await pickImage();
};

export const resizeAndUpload = async (image: string) => {
  return await uploadImage(await resizeImage(image));
};
