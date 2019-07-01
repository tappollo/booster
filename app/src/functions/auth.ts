import { auth, firestore } from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { withHud } from "./async";
import { useDocument } from "./firestore";
import { DocumentReference } from "react-native-firebase/firestore";

const store = firestore();

export type User = import("react-native-firebase").RNFirebase.User;
export type ConfirmationResult = import("react-native-firebase").RNFirebase.ConfirmationResult;
type UserInfo_ = import("./types").UserInfo;
export interface UserInfo extends UserInfo_ {
  avatar?: DocumentReference;
}

export const currentUser = () => {
  const user = auth().currentUser;
  if (user == null) {
    throw new Error("User has not logged in yet");
  }
  return user;
};

export const useCurrentUserProfile = () =>
  useDocument<UserInfo>(store.collection("users").doc(currentUser().uid)).value;

export const userRef = (user: User) => store.collection("users").doc(user.uid);

const createUserRefIfNotExists = async (user: User) => {
  const { exists } = await userRef(user).get();
  if (!exists) {
    const userInfo: UserInfo = {
      displayName: user.displayName || undefined,
      email: user.email || undefined,
      phoneNumber: user.phoneNumber || undefined,
      photoURL: user.photoURL || undefined, // TODO: download it and convert to firebase imgs
      providerId: user.providerId,
      uid: user.uid
    };
    await userRef(user).set(userInfo);
  }
  return user;
};

interface EmailCredential {
  email: string;
  password: string;
}

export const activateWithCode = async (
  code: string,
  result: ConfirmationResult
) => {
  const user = await result.confirm(code);
  if (user) {
    await createUserRefIfNotExists(user);
  }
  return user;
};
export const signInWithPhone = async (phone: string) => {
  return await auth().signInWithPhoneNumber(phone);
};

export const signIn = async ({ email, password }: EmailCredential) => {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  await createUserRefIfNotExists(user);
  return user;
};

export const signUp = async ({ email, password }: EmailCredential) => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  await createUserRefIfNotExists(user);
  return user;
};

export const signInFacebook = async () => {
  LoginManager.logOut();
  const result = await LoginManager.logInWithReadPermissions(["email"]);
  if (result.isCancelled) {
    throw Error("Cancel");
  }
  return await withHud("Loading", async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (!token) {
      throw Error("failed to get token");
    }
    const credential = auth.FacebookAuthProvider.credential(token.accessToken);
    const { user } = await auth().signInWithCredential(credential);
    await createUserRefIfNotExists(user);
    return user;
  })(null);
};

GoogleSignin.configure({
  webClientId: "PHARAH_FIREBASE_GOOGLE_SIGN_IN_WEB_CLIENT_ID"
});

export const signInGoogle = async () => {
  const result = await GoogleSignin.signIn();
  return await withHud("Loading", async () => {
    const credential = auth.GoogleAuthProvider.credential(result.idToken);
    const { user } = await auth().signInWithCredential(credential);
    await createUserRefIfNotExists(user);
    return user;
  })(null);
};
