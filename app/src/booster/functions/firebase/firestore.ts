import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Doc } from "../types";

type DocumentReference = FirebaseFirestoreTypes.DocumentReference;
type Query = FirebaseFirestoreTypes.Query;

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

export const useListenDocument = <T>(docRef: DocumentReference) => {
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

export const useGetDocument = <T>(docRef: DocumentReference) => {
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

export const useListenQuery = <T>(query: Query) => {
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
