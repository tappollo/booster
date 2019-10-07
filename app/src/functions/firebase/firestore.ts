import {
  CollectionReference,
  DocumentReference,
  Query
} from "react-native-firebase/firestore";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Doc } from "../types";

export const useEqual = <T extends { isEqual: (another: T) => boolean }>(
  value: T
): MutableRefObject<T> => {
  const ref = useRef(value);
  if (!value.isEqual(ref.current)) {
    ref.current = value;
  }
  return ref;
};

type LoadingErrorState<T> = {
  loading: boolean;
  error?: Error;
  value?: T;
};

export const useDocumentField = <T, K extends keyof T>(
  docRef: TypedDocumentReference<T>,
  key: K
): [T[K] | undefined, (newValue: T[K]) => void] => {
  const { value, update } = useDocument<T>(docRef);
  const fieldValue = value == null ? undefined : value[key];
  const updateField = useCallback(
    (newValue: T[K]) => {
      const partial: Partial<T> = {};
      partial[key] = newValue;
      update(partial).catch();
    },
    [key, update]
  );
  return [fieldValue, updateField];
};

export const useDocument = <T>(docRef: TypedDocumentReference<T>) => {
  const [state, setState] = useState<LoadingErrorState<T>>({
    loading: true
  });
  const ref = useEqual(docRef).current;
  useEffect(() => {
    const sub = ref.onSnapshot(
      snapshot => {
        setState({
          loading: false,
          value: snapshot.data() as any
        });
      },
      error => {
        setState({
          loading: false,
          error: error
        });
      }
    );
    return () => {
      sub();
      setState({ loading: true });
    };
  }, [ref]);
  const update = useCallback(
    (newValue: Partial<T>) => {
      return ref.set(newValue, { merge: true });
    },
    [ref]
  );
  return {
    ...state,
    update
  };
};

export const useGetDocument = <T>(docRef: TypedDocumentReference<T>) => {
  const [state, setState] = useState<LoadingErrorState<T>>({
    loading: true
  });
  const ref = useEqual(docRef).current;
  useEffect(() => {
    ref
      .get()
      .then(value => {
        setState({
          loading: false,
          value: value.data() as any
        });
      })
      .catch(error => {
        setState({
          loading: false,
          error: error
        });
      });
    return () => {
      setState({ loading: true });
    };
  }, [ref]);
  return state;
};

type QueryOperator = "=" | "==" | ">" | ">=" | "<" | "<=" | "array-contains";

export interface TypedQuery<T> extends Query {}
export interface TypedDocumentReference<T> extends DocumentReference {
  update(partial: Partial<T>): Promise<void>;
  update<K extends keyof T>(k: K, v: T[K]): Promise<void>;
}
export interface TypedCollectionReference<T> extends CollectionReference {
  doc(documentPath?: string): TypedDocumentReference<T>;
  where<K extends keyof T>(
    fieldPath: K,
    op: QueryOperator,
    value: T[K]
  ): TypedQuery<T>;
}

export const useQuery = <T>(query: TypedQuery<T>) => {
  const [state, setState] = useState<LoadingErrorState<Array<Doc<T>>>>({
    loading: true
  });
  const queryRef = useEqual(query).current;
  useEffect(() => {
    queryRef.onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          doc: doc.data() as any
        }));
        setState({
          loading: false,
          value: docs
        });
      },
      error => {
        setState({
          loading: false,
          error
        });
      }
    );
    return () => {
      setState({ loading: true });
    };
  }, [queryRef]);
  return state;
};
