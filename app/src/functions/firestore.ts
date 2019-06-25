import { useEffect, useState } from "react";
import Firestore from "react-native-firebase/firestore";
import { DocumentReference, CollectionReference } from "./types";

export const useCollection = <T extends {}>(ref?: CollectionReference<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Firestore.SnapshotError>();
  useEffect(() => {
    if (ref) {
      return ref.onSnapshot(
        col => setData(col.docs.map(d => d.data() as T)),
        err => setError(err)
      );
    }
  }, [ref && ref.id, ref && ref.parent && ref.parent.path]);
  return [data, error] as [T[], any];
};

export const useDocument = <T extends {}>(
  ref?: DocumentReference<T> | null,
  filter?: (current?: T, previous?: T) => boolean
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Firestore.SnapshotError>();
  useEffect(() => {
    if (ref) {
      return ref.onSnapshot(
        doc => {
          const newData = doc.data() as (T | undefined);
          if (!filter || (filter && filter(newData, data))) {
            setData(newData);
          }
        },
        err => setError(err)
      );
    }
  }, [ref && ref.path]);
  return [data, error] as [T | undefined, Firestore.SnapshotError | undefined];
};
