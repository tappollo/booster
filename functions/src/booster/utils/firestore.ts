import * as admin from "firebase-admin";

export const collection = (collectionId: string) =>
  admin.firestore().collection(collectionId);

export function useDocAsType<T>() {
  return function(doc: admin.firestore.DocumentReference) {
    async function read() {
      const snapshot = await doc.get();
      const profile: T = snapshot.data() as any;
      if (!snapshot.exists || profile == null) {
        const error = new Error(`Doc ${doc.path} does not exist`);
        console.error(error);
        throw error;
      }
      return profile;
    }
    async function update(newValue: Partial<T>) {
      return await doc.set(newValue, { merge: true });
    }
    async function deleteDoc() {
      await doc.delete();
    }
    return {
      read,
      update,
      delete: deleteDoc
    };
  };
}
