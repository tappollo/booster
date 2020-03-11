import Browser from "react-native-inappbrowser-reborn";
import { Linking, Platform } from "react-native";
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

export const useToolbarOnFocus = (enable: boolean) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (Platform.OS === "ios" && isFocused) {
      KeyboardManager.setEnableAutoToolbar(enable);
    }
  }, [isFocused, enable]);
};

export const useKeyboardManagerOnFocus = (enable: boolean) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (Platform.OS === "ios" && isFocused) {
      KeyboardManager.setEnable(enable);
    }
  }, [isFocused, enable]);
};

export function compose<A, B, C>(l: (a: A) => B, r: (b: B) => C): (a: A) => C {
  return a => r(l(a));
}
