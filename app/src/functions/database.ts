import { useEffect, useState } from "react";
import { DataSnapshot } from "react-native-firebase/database";
import { database } from "react-native-firebase";

export const useDatabaseField = <T>(path: string) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | undefined>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const callback = (snapshot: DataSnapshot) => {
      setLoading(false);
      setValue(snapshot.exists() ? snapshot.val() : undefined);
    };
    const ref = database().ref(path);
    ref.on("value", callback, e => {
      setError(e);
      setLoading(false);
    });
    return () => {
      ref.off("value", callback);
    };
  }, [path]);
  return {
    value,
    loading,
    error,
    update: async (newValue: Partial<T>) => {
      await database()
        .ref(path)
        .update(newValue);
    }
  };
};
