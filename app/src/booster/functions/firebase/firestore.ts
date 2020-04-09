import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { CollectionReference, DocumentReference } from "./firestoreHooks";

type GetOptions = FirebaseFirestoreTypes.GetOptions;

export const collection = (collectionId: string): CollectionReference => {
  return firestore().collection(collectionId);
};

type DocTypedWrapper<T> = {
  read: (options?: GetOptions) => Promise<T>;
  update: (value: Partial<T>) => Promise<void>;
  listen: (callback: (value: T) => void) => () => void;
  ref: () => DocumentReference;
};

export function makeDocAsType<T>(
  doc: () => DocumentReference
): DocTypedWrapper<T> {
  async function read(options?: GetOptions) {
    const snapshot = await doc().get(options);
    const value: T = snapshot.data() as any;
    if (!snapshot.exists || value == null) {
      throw new Error(`Doc ${doc().path} does not exist`);
    }
    return value;
  }
  async function update(newValue: Partial<T>) {
    return await doc().set(newValue, { merge: true });
  }
  function listen(callback: (value: T) => void) {
    return doc().onSnapshot((snapshot) => {
      callback(snapshot.data() as any);
    });
  }
  return {
    ref: doc,
    read,
    update,
    listen,
  };
}
