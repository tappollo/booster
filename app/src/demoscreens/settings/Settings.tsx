import React from "react";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import styled from "styled-components/native";
import { auth } from "react-native-firebase";
import { Avatar, Body, Cell, Column, Secondary } from "../../components";
import { colors, margins } from "../../styles";
import { useCurrentUserProfile } from "../../functions/auth";

const Divider = styled.View`
  height: ${margins.base};
`;
const Content = styled(Column)`
  background-color: ${colors.smoke};
`;
const PAvatar = styled(Avatar)`
  margin-left: ${margins.base};
`;

const ProfileCell = (props: { onPress: () => void }) => {
  const user = useCurrentUserProfile();
  return (
    <Cell
      onPress={props.onPress}
      leftView={
        <PAvatar
          name={user && user.displayName}
          image={{ uri: user && user.photoURL }}
        />
      }
      disclosure
      style={{ height: 72 }}
    >
      <Column expand>
        <Body>{user && user.displayName}</Body>
        <Secondary color={colors.darkGrey}>{user && user.email}</Secondary>
      </Column>
    </Cell>
  );
};

const Settings: NSC<{}, NSO> = ({ navigation }) => {
  return (
    <Content expand>
      <Divider />
      <ProfileCell onPress={() => navigation.navigate("Profile")} />
      <Divider />
      <Cell disclosure onPress={() => navigation.navigate("Notifications")}>
        Notifications
      </Cell>
      <Divider />
      <Cell disclosure separator>
        FAQ
      </Cell>
      <Cell disclosure>Policy</Cell>
      <Divider />
      <Cell
        color={colors.red}
        onPress={async () => {
          await auth().signOut();
          navigation.navigate("OnBoarding");
        }}
      >
        Log Out
      </Cell>
    </Content>
  );
};

Settings.navigationOptions = {
  title: "Settings"
};

export default Settings;
