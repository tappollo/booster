import { DocumentReference, Query } from "react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Doc } from "./types";

export const useDocument = <T>(
  ref: DocumentReference | undefined,
  deps: any[] = []
) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    if (ref == null) {
      return;
    }
    return ref.onSnapshot(
      snapshot => {
        if (snapshot.exists) {
          setValue(snapshot.data() as any);
        }
        setLoading(false);
      },
      e => {
        setLoading(false);
        setError(e);
      }
    );
  }, deps);
  const update = useCallback(async (newValue: Partial<T>) => {
    if (ref != null) {
      await ref.set(newValue, { merge: true });
    }
  }, deps);
  return { value, loading, update, error };
};

export const useCollection = <T>(
  query?: Query,
  deps: any[] = []
): { items: Array<Doc<T>>; loading: boolean; error?: Error } => {
  const [items, setItems] = useState<Array<Doc<T>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    if (!query) {
      return;
    }
    return query.onSnapshot(
      snapshot => {
        setItems(
          snapshot.docs.map(doc => ({
            id: doc.id || "unknown",
            doc: doc.data() as any
          }))
        );
        setLoading(false);
      },
      e => {
        setLoading(false);
        setError(e);
      }
    );
  }, deps);
  return { items, loading, error };
};
