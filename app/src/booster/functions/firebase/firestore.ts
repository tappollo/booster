import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";
import { CollectionReference, DocumentReference } from "./firestoreHooks";
type GetOptions = FirebaseFirestoreTypes.GetOptions;

export const collection = (collectionId: string): CollectionReference => {
  return firestore().collection(collectionId);
};

type DocTypedWrapper<T> = {
  read: (options?: GetOptions) => Promise<T>;
  update: (value: Partial<T>) => Promise<void>;
  ref: () => DocumentReference;
};

export function makeDocAsType<T>(
  doc: () => DocumentReference
): DocTypedWrapper<T> {
  async function read(options?: GetOptions) {
    const snapshot = await doc().get(options);
    const profile: T = snapshot.data() as any;
    if (!snapshot.exists || profile == null) {
      const error = new Error(`Doc ${doc().path} does not exist`);
      console.error(error);
      throw error;
    }
    return profile;
  }
  async function update(newValue: Partial<T>) {
    return await doc().set(newValue, { merge: true });
  }
  return {
    ref: doc,
    read,
    update
  };
}
