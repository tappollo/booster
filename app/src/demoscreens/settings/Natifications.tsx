import React from "react";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { Switch } from "react-native";
import { Column, Cell } from "../../components";
import { colors, margins } from "../../styles";
import styled from "styled-components/native";

const Divider = styled.View`
  height: ${margins.base};
`;
const Content = styled(Column)`
  background-color: ${colors.smoke};
`;
const Toggle = styled.Switch`
  margin-right: ${margins.base};
`;
const Settings: NSC<{}, NSO> = () => (
  <Content expand>
    <Divider />
    <Cell
      rightView={
        <Toggle trackColor={{ true: colors.blue, false: colors.smoke }} />
      }
    >
      Notifications
    </Cell>
  </Content>
);

Settings.navigationOptions = {
  title: "Notifications"
};

export default Settings;
