import * as admin from "firebase-admin";

export const collection = (collectionId: string) =>
  admin.firestore().collection(collectionId);

function replaceUndefinedWithNull<
  T extends {
    [key: string]: any;
  }
>(input: T): T {
  Object.keys(input).forEach((key) => {
    if (input[key] == null) {
      input[key as keyof T] = null as any;
    } else if (typeof input[key] === "object") {
      replaceUndefinedWithNull(input[key]);
    }
  });
  return input;
}

export function useDocAsType<T>(doc: admin.firestore.DocumentReference) {
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
  async function set(newValue: T): Promise<string> {
    await doc.set(replaceUndefinedWithNull(newValue));
    return doc.id;
  }
  async function update(newValue: Partial<T>) {
    return await doc.set(replaceUndefinedWithNull(newValue), { merge: true });
  }
  async function listen(callback: (value: T) => void) {
    return doc.onSnapshot((snapshot) => {
      callback(snapshot.data() as any);
    });
  }
  async function deleteDoc() {
    await doc.delete();
  }
  return {
    ref: doc,
    read,
    update,
    set,
    listen,
    delete: deleteDoc,
  };
}

export const useQueryAsType = <T>(query: admin.firestore.Query) => {
  async function read() {
    const { docs } = await query.get();
    return docs.map((d) => ({
      ref: d.ref,
      id: d.id,
      doc: d.data() as T,
    }));
  }
  return { read };
};
