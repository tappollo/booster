import { NativeModules, Platform } from "react-native";
import React from "react";
import { useEffect } from "react";

let numberOfConversationsOnScreen = 0;

// This is a workaround for IQKeyboardManager on iOS
// It conflicts with react-navigation

const DisableIQKeyboardWhenFocused = () => {
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    numberOfConversationsOnScreen++;
    if ((numberOfConversationsOnScreen = 1)) {
      NativeModules.RNIQKeyboardManager.set(false);
    }
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
