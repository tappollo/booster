import { useCallback, useEffect, useState } from "react";
import { LoadingErrorState, useEqual } from "./firestore";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";

type Reference = FirebaseDatabaseTypes.Reference;
type DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;

export const useListenDatabase = <T>(ref: Reference) => {
  const [state, setState] = useState<LoadingErrorState<T>>({
    loading: true
  });
  const stableRef = useEqual(ref).current;
  useEffect(() => {
    setState(s => ({ ...s, loading: true, error: undefined }));
    const callback = (snapshot: DataSnapshot) => {
      setState(s => ({ ...s, value: snapshot.val(), loading: false }));
    };
    stableRef.on("value", callback, (error: Error) => {
      setState(s => ({ ...s, error }));
    });
    return () => {
      stableRef.off("value", callback);
    };
  }, [stableRef]);
  const update = useCallback(
    (newValue: Partial<T>) => {
      return stableRef.set(newValue);
    },
    [stableRef]
  );
  return {
    ...state,
    update
  };
};
