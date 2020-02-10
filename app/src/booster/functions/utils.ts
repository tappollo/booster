import Browser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { useEffect } from "react";

// @ts-ignore
import KeyboardManager from "react-native-keyboard-manager";

export const openURL = async (url: string) => {
  if (await Browser.isAvailable()) {
    await Browser.open(url);
  } else {
    await Linking.openURL(url);
  }
};

export const useDisableToolbarOnFocus = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    KeyboardManager.setEnableAutoToolbar(!isFocused);
  }, [isFocused]);
};

export const useEnableKeyboardManagerOnFocus = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    KeyboardManager.setEnable(isFocused);
  }, [isFocused]);
};
