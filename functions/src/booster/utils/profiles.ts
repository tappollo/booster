import { collection, useDocAsType } from "./firestore";
import { compose } from "./utils";
import { PrivateProfile, Profile, ReadonlyProfile } from "../../types";

export const getUserProfileRef = (uid: string) =>
  collection("userProfiles").doc(uid);

export const getPrivateProfileRef = (uid: string) =>
  collection("userPrivateProfiles").doc(uid);

export const getReadonlyProfileRef = (uid: string) =>
  collection("userReadonlyProfiles").doc(uid);

export const useUserProfile = compose(
  getUserProfileRef,
  useDocAsType<Profile>()
);

export const usePrivateProfile = compose(
  getPrivateProfileRef,
  useDocAsType<PrivateProfile>()
);

export const useReadonlyProfile = compose(
  getReadonlyProfileRef,
  useDocAsType<ReadonlyProfile>()
);
