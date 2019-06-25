import { NativeModules, Platform } from "react-native";
import { NavigationEvents } from "react-navigation";
import * as React from "react";

const DisableIQKeyboardWhenFocused = () => {
  if (Platform.OS === "ios") {
    return (
      <NavigationEvents
        onWillFocus={() => {
          NativeModules.RNIQKeyboardManager.set(false);
        }}
        onWillBlur={() => {
          NativeModules.RNIQKeyboardManager.set(true);
        }}
      />
    );
  }
  return null;
};

export default DisableIQKeyboardWhenFocused;
