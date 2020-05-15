import { Alert } from "react-native";
import { useCallback, useState } from "react";

export function useOnPromise<T>(action: () => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const onPromise = useCallback(async () => {
    try {
      setLoading(true);
      return await action();
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [action]);
  return { loading, onPromise };
}
