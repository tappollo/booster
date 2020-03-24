import React, { useContext } from "react";
import { AppRouteContext } from "../../Routes";
import { BigButton } from "../../../components/Button";
import auth from "@react-native-firebase/auth";
import { useActionSheet } from "@expo/react-native-action-sheet";

const LogoutButton = () => {
  const { resetRoute } = useContext(AppRouteContext);
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <BigButton
      onPress={() => {
        showActionSheetWithOptions(
          {
            title: "Are you sure?",
            options: ["Logout", "Cancel"],
            destructiveButtonIndex: 0,
            cancelButtonIndex: 1
          },
          async i => {
            if (i === 1) {
              return;
            }
            await auth().signOut();
            resetRoute?.();
          }
        );
      }}
    >
      Logout
    </BigButton>
  );
};

export default LogoutButton;
