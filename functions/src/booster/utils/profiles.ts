import { collection, getDocAsType } from "./firestore";
import { compose } from "./utils";
import { PrivateProfile, Profile, ReadonlyProfile } from "../../types";

export const getUserProfileRef = (uid: string) =>
  collection("userProfiles").doc(uid);

export const getPrivateProfileRef = (uid: string) =>
  collection("userPrivateProfiles").doc(uid);

export const getReadonlyProfileRef = (uid: string) =>
  collection("userReadonlyProfiles").doc(uid);

export const getUserProfile = compose(
  getUserProfileRef,
  getDocAsType<Profile>()
);

export const getPrivateProfile = compose(
  getPrivateProfileRef,
  getDocAsType<PrivateProfile>()
);

export const getReadonlyProfile = compose(
  getReadonlyProfileRef,
  getDocAsType<ReadonlyProfile>()
);
