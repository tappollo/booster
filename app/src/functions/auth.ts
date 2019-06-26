import { createContext, useContext, Context } from "react";
import { auth, firestore } from "react-native-firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { DocumentReference, ImageData } from "./types";
import { withHud } from "./async";
import { async } from "q";

const store = firestore();

export type User = import("react-native-firebase").RNFirebase.User;
export type ConfirmationResult = import("react-native-firebase").RNFirebase.ConfirmationResult;
type UserInfo_ = import("react-native-firebase").RNFirebase.UserInfo;
interface UserInfo extends UserInfo_ {
  avatar?: DocumentReference<ImageData>;
}

export const AuthContext = createContext<UserInfo | undefined>(undefined);
export const useCurrentUser = () => useContext(AuthContext);

export const userRef = (user: User) =>
  store.collection("users").doc(user.uid) as DocumentReference<UserInfo>;
export const currentUserRef = () => {
  const user = auth().currentUser;
  return user ? userRef(user) : undefined;
};

// TODO: move this to Firebase Cloud Functions triger by User creation
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
    userRef(user).set(userInfo);
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
  const result = await auth().signInWithPhoneNumber(phone);
  return result;
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
  });
};

GoogleSignin.configure();
export const signInGoogle = async () => {
  const result = await GoogleSignin.signIn();
  console.log(result);
  return await withHud("Loading", async () => {
    const credential = auth.GoogleAuthProvider.credential(result.idToken);
    const { user } = await auth().signInWithCredential(credential);
    await createUserRefIfNotExists(user);
    return user;
  });
};
