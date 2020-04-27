import { collection, useDocAsType } from "./firestore";
import { PrivateProfile, Profile, ReadonlyProfile } from "../../types";

export const useUserProfile = (uid: string) =>
  useDocAsType<Profile>(collection("userProfiles").doc(uid));

export const usePrivateProfile = (uid: string) =>
  useDocAsType<PrivateProfile>(collection("userPrivateProfiles").doc(uid));

export const useReadonlyProfile = (uid: string) =>
  useDocAsType<ReadonlyProfile>(collection("userReadonlyProfiles").doc(uid));

export const usePayments = (uid: string, paymentId: string) =>
  useDocAsType<any>(
    collection("userReadonlyProfiles")
      .doc(uid)
      .collection("payments")
      .doc(paymentId)
  );
