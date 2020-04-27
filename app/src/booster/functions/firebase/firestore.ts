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
  let doc: DocumentReference;
  const lazyDoc = () => {
    doc = doc ?? docGen();
    return doc;
  };
  async function read(options?: GetOptions) {
    const snapshot = await lazyDoc().get(options);
    const value: T = snapshot.data() as any;
    if (!snapshot.exists || value == null) {
      throw new Error(`Doc ${lazyDoc().path} does not exist`);
    }
    return value;
  }
  async function update(newValue: Partial<T>) {
    return await lazyDoc().set(newValue, { merge: true });
  }
  function listen(callback: (value: T) => void) {
    return lazyDoc().onSnapshot((snapshot) => {
      callback(snapshot.data() as any);
    });
  }
  function useListen() {
    return useListenDocument<T>(lazyDoc());
  }
  return {
    ref: lazyDoc,
    useListen,
    read,
    update,
    listen,
  };
}
