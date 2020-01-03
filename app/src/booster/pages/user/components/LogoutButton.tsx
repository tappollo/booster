import React, { useContext } from "react";
import { AppRouteContext } from "../../Routes";
import { BigButton } from "../../../components/Button";
import auth from "@react-native-firebase/auth";

const LogoutButton = () => {
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

export default LogoutButton;
