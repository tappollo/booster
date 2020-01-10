import Browser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";

export const openURL = async (url: string) => {
  if (await Browser.isAvailable()) {
    await Browser.open(url);
  } else {
    await Linking.openURL(url);
  }
};
