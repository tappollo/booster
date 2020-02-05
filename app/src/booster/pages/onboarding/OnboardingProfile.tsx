import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { usePickAndUploadImage } from "../../functions/image";
import { Alert } from "react-native";
import { useListenDocument } from "../../functions/firebase/firestore";
import { currentUser, profileRef } from "../../functions/user";
import { Profile } from "../../functions/types";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { AppRouteContext } from "../Routes";

const AvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  background-color: #cccccc;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(211, 211, 211, 0.5);
  justify-content: center;
  align-items: center;
`;

const Avatar = styled(FastImage)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 60px;
`;

const OnboardingProfile = () => {
  const { resetRoute } = useContext(AppRouteContext);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { value, update } = useListenDocument<Profile>(profileRef());
  const {
    pick,
    isUploading,
    localImage,
    serverImage
  } = usePickAndUploadImage();
  const avatar = serverImage || value?.avatar || currentUser().photoURL;
  const name = nameInput || value?.name || currentUser().displayName;
  return (
    <PageContainer>
      <BigTitle>Choose your{"\n"}name and avatar</BigTitle>
      <AvatarButton onPress={pick}>
        {avatar && (
          <Avatar
            source={{
              uri: localImage || avatar
            }}
          />
        )}
        {isUploading && <ActivityIndicator />}
      </AvatarButton>
      <TextInput
        mode="outlined"
        label="Name"
        value={name || ""}
        onChangeText={setNameInput}
      />
      <BigButton
        loading={saving}
        disabled={isUploading || avatar == null || !name}
        onPress={async () => {
          try {
            setSaving(true);
            await update({ avatar: avatar!, name: name! });
            setSaving(false);
            resetRoute?.();
          } catch (e) {
            Alert.alert(e.message);
            setSaving(false);
          }
        }}
      >
        Save Profile
      </BigButton>
    </PageContainer>
  );
};

export default OnboardingProfile;
