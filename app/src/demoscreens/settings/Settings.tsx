import React from "react";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import styled from "styled-components/native";
import { auth } from "react-native-firebase";
import { Avatar, Body, Cell, Column, Secondary } from "../../components";
import { colors, margins } from "../../styles";

const Divider = styled.View`
  height: ${margins.base};
`;
const Content = styled(Column)`
  background-color: ${colors.smoke};
`;
const PAvatar = styled(Avatar)`
  margin-left: ${margins.base};
`;
const img =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAIAAACU32q7AAAACXBIWXMAAArrAAAK6wGCiw1aAAABUUlEQVQoz22RbU/CMBDH+fxqNLzyhUGDGpSZYTRDEH0hCiiM4cAMNnSYSHjYgwmTta7rOu2GrjHx0l7v0l+v/15TX/8Z8iOjQRhGaSrZwBhBuKABcN0Cx6XT247zEXNhKl4I9eP5k6wKNLNM86bEC9zBhVCKj8fQJ4DI8z3PpYOmtmWK1eJEE4+yu5PJ9Oc65CEP0umTICo5GvZvheOryiV/kgdg+asplod9pCk9TR1oPalxzu3tZK4rJaaJEIIQMmZz4bQg1Wt6d1A8zKU31yRRZBB9jmVYrVqTz3HS3cNbXz87yG9trMsdmUHYx+bUGKlDpd1tVZv9ushnsvuZbEeUAxywPkEAbcMcj14Vqas0WrVy+fG+bRsWibvDmuku3XfDMqYzXdOf1RfbtEkQrLYYROVDAGhJZ+Gs/iQxBlGBlMMYUx+lJFzZHyhBkyCBvgHMYM2xE0nQHQAAAABJRU5ErkJggg==";

const ProfileCell = styled(props => (
  <Cell
    {...props}
    leftView={<PAvatar name="Jane Doe" image={{ uri: img }} />}
    disclosure
  >
    <Column expand>
      <Body>Jane Doe</Body>
      <Secondary color={colors.darkGrey}>email@email.com</Secondary>
    </Column>
  </Cell>
))`
  height: 72px;
`;

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
