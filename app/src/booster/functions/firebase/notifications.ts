import { useCallback, useEffect } from "react";
import { HomeNavStackParams } from "../../pages/home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { NotificationData, PrivateProfile } from "../types";
import { Alert, AppState } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { typedConversation } from "../chat";
import { typedPrivateProfile } from "../user";
import { keyOf } from "./firestoreHooks";
import DeviceInfo from "react-native-device-info";

export const useHandlingNotifications = () => {
  const navigation = useNavigation<StackNavigationProp<HomeNavStackParams>>();
  const handleNotification = useCallback(
    (data?: NotificationData) => {
      if (data == null) {
        return;
      }
      if (data.type === "chat") {
        typedConversation(data.chatId)
          .read()
          .then((doc) => {
            navigation.push("chatDetail", { doc, id: data.chatId });
          });
      }
    },
    [navigation]
  );
  const updateToken = useCallback((token: string) => {
    typedPrivateProfile
      .ref()
      .update(
        keyOf<PrivateProfile>("pushTokens") + "." + DeviceInfo.getUniqueId(),
        token
      )
      .catch();
  }, []);

  useEffect(() => {
    messaging().requestPermission();
    messaging().getToken().then(updateToken);
  }, [updateToken]);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((message) => handleNotification(message?.data as any));
    messaging().onNotificationOpenedApp((message) =>
      handleNotification(message?.data as any)
    );
  }, [handleNotification]);

  useEffect(() => {
    return messaging().onMessage((message) => {
      if (AppState.currentState !== "active") {
        return;
      }
      Alert.alert(
        "Alert",
        message.notification?.title ??
          message.notification?.body ??
          "New message",
        [
          {
            text: "Open",
            style: "default",
            onPress: () =>
              handleNotification(message.data as NotificationData | undefined),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    });
  }, [handleNotification]);
};
