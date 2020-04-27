import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { PrivateProfile, Profile, ReadonlyProfile } from "./types";
import { collection, makeDocAsType } from "./firebase/firestore";
import functions from "@react-native-firebase/functions";
import { useEffect, useState } from "react";
import { keyOf } from "./firebase/firestoreHooks";
import DeviceInfo from "react-native-device-info";

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
    return snapshot.onboardingCompleted! > 0;
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

export const promoteToAdmin = async (password: string) => {
  await functions().httpsCallable("user-promoteToAdmin")({ password });
  await auth().currentUser?.getIdToken(true);
};

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    auth()
      .currentUser!.getIdTokenResult()
      .then((value) => setIsAdmin(value.claims.isAdmin));
  }, []);
  return isAdmin;
};

export const logout = async () => {
  try {
    await typedPrivateProfile
      .ref()
      .update(
        keyOf<PrivateProfile>("pushTokens") + "." + DeviceInfo.getUniqueId(),
        firestore.FieldValue.delete()
      );
  } finally {
    await auth().signOut();
  }
};
