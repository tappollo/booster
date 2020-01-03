import { BigButton } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import React, { useContext } from "react";
import { AppRouteContext } from "../Routes";

const HomePage = () => {
  const { resetRoute } = useContext(AppRouteContext);
  return (
    <BigButton
      onPress={async () => {
        await auth().signOut();
        resetRoute?.();
      }}
    >
      Logout
    </BigButton>
  );
};

export default HomePage;
