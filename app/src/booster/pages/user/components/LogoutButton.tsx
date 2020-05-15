import React, { useContext } from "react";
import { BigButton } from "../../../components/Button";
import { logout } from "../../../functions/user";
import { useActionSheet } from "../../../functions/actionsheet";
import { StyleProp, ViewStyle } from "react-native";
import { AppRouteContext } from "../../AppRouteContext";

const LogoutButton = (props: { style?: StyleProp<ViewStyle> }) => {
  const { resetRoute } = useContext(AppRouteContext);
  const showActionSheetWithOptions = useActionSheet();
  return (
    <BigButton
      style={props.style}
      onPress={() => {
        showActionSheetWithOptions(
          [
            {
              title: "Logout",
              type: "destructive",
              onPress: async () => {
                await logout();
                resetRoute?.();
              },
            },
            {
              type: "cancel",
              title: "Cancel",
            },
          ],
          {
            title: "Are you sure?",
          }
        );
      }}
    >
      Sign Out
    </BigButton>
  );
};

export default LogoutButton;
