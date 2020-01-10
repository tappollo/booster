import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";
import { keyOf } from "./firebase/firestore";
import { Profile } from "./types";
type DocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot;

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

export const userFinishedSignUp = async () => {
  const valid = (snapshot: DocumentSnapshot) => {
    return (
      snapshot.exists &&
      snapshot.get(keyOf<Profile>("name")) &&
      snapshot.get(keyOf<Profile>("avatar"))
    );
  };
  const cached = await profileRef().get({ source: "cache" });
  if (valid(cached)) {
    return true;
  }
  const server = await profileRef().get({ source: "server" });
  return valid(server);
};
