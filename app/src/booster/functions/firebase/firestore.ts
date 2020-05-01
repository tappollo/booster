import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import {
  CollectionReference,
  DocumentReference,
  LoadingErrorState,
  useListenDocument,
} from "./firestoreHooks";

type GetOptions = FirebaseFirestoreTypes.GetOptions;

export const collection = (collectionId: string): CollectionReference => {
  return firestore().collection(collectionId);
};

type DocTypedWrapper<T> = {
  useListen: () => LoadingErrorState<T>;
  read: (options?: GetOptions) => Promise<T>;
  update: (value: Partial<T>) => Promise<void>;
  listen: (callback: (value: T) => void) => () => void;
  ref: () => DocumentReference;
};

export function makeDocAsType<T>(
  docGen: () => DocumentReference
): DocTypedWrapper<T> {
  async function read(options?: GetOptions) {
    const snapshot = await docGen().get(options);
    if (!snapshot?.exists) {
      throw new Error(`Doc ${docGen().path} does not exist`);
    }
    return snapshot.data() as T;
  }
  async function update(newValue: Partial<T>) {
    return await docGen().set(newValue, { merge: true });
  }
  function listen(callback: (value: T) => void) {
    return docGen().onSnapshot((snapshot) => {
      if (snapshot?.exists) {
        callback(snapshot.data() as any);
      }
    });
  }
  function useListen() {
    return useListenDocument<T>(docGen());
  }
  return {
    ref: docGen,
    useListen,
    read,
    update,
    listen,
  };
}
