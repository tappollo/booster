import { Alert } from "react-native";
import { useState } from "react";

export const useOnPromise = (promise: () => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  return {
    loading,
    onPress: async () => {
      try {
        setLoading(true);
        await promise();
        setLoading(false);
      } catch (e) {
        Alert.alert(e.message);
        setLoading(false);
      }
    },
  };
};
