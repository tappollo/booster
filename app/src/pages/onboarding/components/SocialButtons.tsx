import { BigButton } from "../../../components/Button";
import React, { useState } from "react";
import { Alert } from "react-native";

const loginWithFacebook = async () => {};

export const LoginWithFacebook = () => {
  const [loading, setLoading] = useState(false);
  return (
    <BigButton
      loading={loading}
      onPress={() => {
        try {
          setLoading(true);
        } catch (e) {
          Alert.alert("Error", e.message);
        } finally {
          setLoading(false);
        }
      }}
    >
      Continue with Facebook
    </BigButton>
  );
};
