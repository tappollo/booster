import { NativeModules, Platform } from "react-native";
import * as React from "react";
import { useEffect } from "react";

let numberOfConversationsOnScreen = 0;

const DisableIQKeyboardWhenFocused = () => {
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    numberOfConversationsOnScreen++;
    NativeModules.RNIQKeyboardManager.set(false);
    return () => {
      numberOfConversationsOnScreen--;
      if (numberOfConversationsOnScreen === 0) {
        NativeModules.RNIQKeyboardManager.set(true);
      }
    };
  }, []);
  return null;
};

export default DisableIQKeyboardWhenFocused;
