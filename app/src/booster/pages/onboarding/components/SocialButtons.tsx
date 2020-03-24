import { BigButton } from "../../../components/Button";
import React, { useState } from "react";
import { Alert } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { typedProfile } from "../../../functions/user";
import { GoogleSignin } from "react-native-google-signin";
import { useNavigation } from "@react-navigation/core";

type AuthCredential = FirebaseAuthTypes.AuthCredential;

const signIn = async (cred: AuthCredential) => {
  const { user, additionalUserInfo } = await auth().signInWithCredential(cred);
  if (additionalUserInfo && additionalUserInfo.isNewUser) {
    const name = user.displayName || "";
    const email = user.email || "unknown@example.com";
    await typedProfile.update({
      name,
      email,
      avatar: user.photoURL || ""
    });
  }
};

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
  const credential = auth.FacebookAuthProvider.credential(token.accessToken);
  await signIn(credential);
};

GoogleSignin.configure();

export const authGoogle = async () => {
  const result = await GoogleSignin.signIn();
  console.log(result);
  const credential = auth.GoogleAuthProvider.credential(result.idToken);
  await signIn(credential);
};

export const generateSocialButton = (props: {
  title: string;
  onAction: () => Promise<void>;
}) => () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <BigButton
      loading={loading}
      onPress={async () => {
        try {
          setLoading(true);
          await props.onAction();
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
      {props.title}
    </BigButton>
  );
};

export const LoginWithFacebook = generateSocialButton({
  title: "Continue with Facebook",
  onAction: authFacebook
});

export const LoginWithGoogle = generateSocialButton({
  title: "Continue with Google",
  onAction: authGoogle
});
