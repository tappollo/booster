import auth from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { PrivateProfile, Profile, ReadonlyProfile } from "./types";
import { collection, makeDocAsType } from "./firebase/firestore";

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

export const typedProfile = makeDocAsType<Profile>(() =>
  collection("userProfiles").doc(currentUserId())
);

export const typedPrivateProfile = makeDocAsType<PrivateProfile>(() =>
  collection("userPrivateProfiles").doc(currentUserId())
);

export const typedReadonlyProfile = makeDocAsType<ReadonlyProfile>(() =>
  collection("userReadonlyProfiles").doc(currentUserId())
);

export const userFinishedSignUp = async () => {
  const valid = (snapshot: Profile) => {
    return snapshot.name && snapshot.avatar;
  };
  const cached = await typedProfile.read({ source: "cache" }).catch(() => null);
  if (cached != null && valid(cached)) {
    return true;
  }
  const server = await typedProfile
    .read({ source: "server" })
    .catch(() => null);
  return server != null && valid(server);
};
