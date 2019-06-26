import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

export const authFacebook = async () => {
  LoginManager.logOut();
  const result = await LoginManager.logInWithReadPermissions(["email"]);
  if (result.isCancelled) {
    throw Error("Cancel");
  }
  const token = await AccessToken.getCurrentAccessToken();
  if (!token) {
    throw Error("failed to get token");
  }
  const credential = firebase.auth.FacebookAuthProvider.credential(
    token.accessToken
  );
  return await firebase.auth().signInWithCredential(credential);
};

GoogleSignin.configure();
export const authGoogle = async () => {
  const result = await GoogleSignin.signIn();
  console.log(result);
  const credential = firebase.auth.GoogleAuthProvider.credential(
    result.idToken
  );
  return await firebase.auth().signInWithCredential(credential);
};
