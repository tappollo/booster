import React, { useEffect, useState } from "react";
import firebase, { auth, messaging } from "react-native-firebase";
import { userRef, AuthContext, User } from "./functions/auth";
import { useDocument } from "./functions/firestore";
import Screens from "./demoscreens";
import { createAppContainer } from "react-navigation";
import { YellowBox, Alert, Clipboard } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

YellowBox.ignoreWarnings([
  // RN 0.58.6 ships with RNCameraRoll with this issue: https://github.com/facebook/react-native/issues/23755:
  "Module RCTImagePickerManager requires main queue setup since it overrides `init`"
]);

const App = createAppContainer(Screens);

const Root = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    return auth().onAuthStateChanged(setUser);
  }, []);
  const [userInfo] = useDocument(user && userRef(user));
  useEffect(() => {
    initPush();
    messaging().onMessage(message => {
      Alert.alert("Received Push Notification");
    });
    return auth().onAuthStateChanged(setUser);
  }, []);
  return (
    <AuthContext.Provider value={userInfo}>
      <App />
    </AuthContext.Provider>
  );
};

const initPush = async () => {
  const enabled = await messaging().hasPermission();
  if (!enabled) {
    await messaging().requestPermission();
  }
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem("fcmToken", fcmToken);
    }
  }
  Clipboard.setString(fcmToken);
};

export default Root;
