import * as admin from "firebase-admin";

export const collection = (collectionId: string) =>
  admin.firestore().collection(collectionId);

export function getDocAsType<T>() {
  return async function(doc: admin.firestore.DocumentReference) {
    const snapshot = await doc.get();
    const profile: T = snapshot.data() as any;
    if (!snapshot.exists || profile == null) {
      throw new Error(`Doc ${doc.path} does not exist`);
    }
    return profile;
  };
}
