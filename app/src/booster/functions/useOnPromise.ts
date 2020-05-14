import { Alert } from "react-native";
import { useCallback, useState } from "react";

export function useOnPromise(action: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const onPromise = useCallback(async () => {
    try {
      setLoading(true);
      await action();
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [action]);
  return { loading, onPromise };
}
