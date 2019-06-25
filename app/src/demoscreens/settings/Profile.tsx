import React from "react";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { Column, Button as Button_, TextField, Avatar } from "../../components";
import { colors, margins } from "../../styles";
import styled from "styled-components/native";
import { requirePermissions, pickImage } from "../../functions/images";
import { auth } from "react-native-firebase";
import { useDocument } from "../../functions/firestore";
import { currentUserRef } from "../../functions/auth";

const Touchable = styled.TouchableOpacity`
  margin-top: ${margins.base};
  align-self: center;
`;
const Content = styled(Column)`
  background-color: ${colors.white};
  align-items: stretch;
  padding-horizontal: ${margins.base};
`;
const Input = styled(TextField)`
  margin-top: ${margins.tiny};
`;
const Button = styled(Button_)`
  margin-top: ${margins.small};
`;

const upload = async () => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }
  await requirePermissions();
  const file = await pickImage();
  const data = new FormData();
  data.append("avatar", {
    uri: file.uri,
    name: file.fileName || "",
    type: file.type || "image/png"
  });
  const token = await user.getIdToken();
  const response = await fetch(
    "https://us-central1-mercy-b94dd.cloudfunctions.net/api/avatar",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: data
    }
  );
  return response;
};
const Profile: NSC<{}, NSO> = ({ navigation }) => {
  const currentUser = currentUserRef();
  const [user, err] = useDocument(currentUser);
  return (
    <Content expand>
      <Touchable
        onPress={() =>
          upload()
            .then(console.log)
            .catch(console.log)
        }
      >
        <Avatar name={user && user.displayName} size="medium" />
      </Touchable>
      <Input label="Name" value={user && user.displayName} />
      <Input label="Email" value={user && user.email} />
      <Button
        title="Save"
        onPress={() => {
          if (currentUser) {
            currentUser
              .update({})
              .then(_ => {
                // Hud
              })
              .catch(e => {
                console.log(e);
                // Err
              });
          }
          navigation.goBack();
        }}
      />
    </Content>
  );
};

Profile.navigationOptions = {
  title: "Profile"
};

export default Profile;
