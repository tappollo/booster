import React, { useState } from "react";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { Avatar, Button as Button_, Column, TextField } from "../../components";
import { colors, margins } from "../../styles";
import styled from "styled-components/native";
import { pickImage, requirePermissions } from "../../functions/images";
import { firestore } from "react-native-firebase";
import { currentUser } from "../../functions/auth";

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
  const user = currentUser();
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
  const [displayName, setDisplayName] = useState<string | undefined>(
    currentUser().displayName || undefined
  );
  const [email, setEmail] = useState<string | undefined>(
    currentUser().email || undefined
  );
  return (
    <Content expand>
      <Touchable
        onPress={() =>
          upload()
            .then(console.log)
            .catch(console.log)
        }
      >
        <Avatar name={displayName} size="medium" />
      </Touchable>
      <Input label="Name" value={displayName} onChangeText={setDisplayName} />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Button
        title="Save"
        onPress={async () => {
          if (currentUser().displayName !== displayName) {
            await currentUser().updateProfile({
              displayName
            });
          }
          if (currentUser().email !== email && email != null) {
            await currentUser().updateEmail(email);
          }
          await firestore()
            .collection("users")
            .doc(currentUser().uid)
            .set(
              {
                displayName,
                email
              },
              { merge: true }
            );
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
