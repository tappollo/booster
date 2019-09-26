import { DocumentReference } from "react-native-firebase/firestore";
import { MutableRefObject, useEffect, useRef, useState } from "react";

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

export const useDocument = <T>(docRef: DocumentReference) => {
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
  return state;
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
