import Browser from "react-native-inappbrowser-reborn";
import { Alert, Linking, Platform } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { useEffect } from "react";
// @ts-ignore
import KeyboardManager from "react-native-keyboard-manager";
// @ts-ignore
import Mailer from "react-native-mail";
import DeviceInfo from "react-native-device-info";
// @ts-ignore
import Share from "react-native-share";
import gitInfo from "./gitHash.macro";
import * as Sentry from "@sentry/react-native";

export const getVersionString = () => {
  const { hash, count } = gitInfo("cacheBuster");
  return `${DeviceInfo.getVersion()}-${count}-${hash.slice(0, 5)}`;
};

export const openURL = async (url: string) => {
  if (await Browser.isAvailable()) {
    await Browser.open(url);
  } else {
    await Linking.openURL(url);
  }
};

export const share = async (message: string) => {
  try {
    await Share.open({ message, failOnCancel: false });
  } catch (e) {
    Alert.alert(e.message);
  }
};

export const sendEmail = (to: string, subject: string, body: string) => {
  Mailer.mail(
    {
      subject,
      recipients: [to],
      body,
      isHTML: true,
    },
    () => null
  );
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
  return (a) => r(l(a));
}

export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

export function sleep(interval: number) {
  return new Promise((resolve) => setTimeout(() => resolve(), interval));
}

export const logError = (error: Error) => {
  Sentry.captureException(error);
};
