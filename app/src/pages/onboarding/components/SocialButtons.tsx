import { BigButton } from "../../../components/Button";
import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import firebase from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { profileRef } from "../../../functions/user";
import { NavigationContext } from "react-navigation";

export const authFacebook = async () => {
  LoginManager.logOut();
  const result = await LoginManager.logInWithPermissions(["email"]);
  if (result.isCancelled) {
    throw null;
  }
  const token = await AccessToken.getCurrentAccessToken();
  if (!token) {
    throw Error("failed to get token");
  }
  const credential = firebase.auth.FacebookAuthProvider.credential(
    token.accessToken
  );
  const {
    user,
    additionalUserInfo
  } = await firebase.auth().signInWithCredential(credential);
  if (additionalUserInfo && additionalUserInfo.isNewUser) {
    const name = user.displayName || "";
    const email = user.email || "unknown@example.com";
    await profileRef().update({
      name,
      email,
      avatar: user.photoURL || ""
    });
  }
};

export const LoginWithFacebook = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useContext(NavigationContext);
  return (
    <BigButton
      loading={loading}
      onPress={async () => {
        try {
          setLoading(true);
          await authFacebook();
          navigation.navigate("Dispatcher");
        } catch (e) {
          if (e) {
            Alert.alert("Error", e.message);
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      Continue with Facebook
    </BigButton>
  );
};
