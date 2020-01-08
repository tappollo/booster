import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const currentUser = () => {
  const user = auth().currentUser;
  if (user == null) {
    throw new Error("User is not logged in");
  }
  return user;
};

export const currentUserId = () => {
  return currentUser().uid;
};

const generateCurrentUserRef = <T>(key: string) => () => {
  return firestore()
    .collection(key)
    .doc(currentUser().uid);
};

export const profileRef = generateCurrentUserRef("userProfiles");

export const privateProfileRef = generateCurrentUserRef("userPrivateProfiles");

export const readonlyProfileRef = generateCurrentUserRef(
  "userReadonlyProfiles"
);
