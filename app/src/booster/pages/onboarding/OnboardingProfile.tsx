import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { usePickAndUploadImage } from "../../functions/image";
import { Alert } from "react-native";
import { useListenDocument } from "../../functions/firebase/firestoreHooks";
import { currentUser, typedProfile } from "../../functions/user";
import { Profile } from "../../functions/types";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { OnboardingStackParams } from "./index";
import { RouteProp, useRoute } from "@react-navigation/core";
import { HomeNavStackParams } from "../home";
import { AppRouteContext } from "../Routes";

const AvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100px;
  height: 100px;
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

const OnboardingProfile = ({
  navigation,
}: {
  navigation: StackNavigationProp<OnboardingStackParams>;
}) => {
  const route = useRoute<RouteProp<HomeNavStackParams, "editProfile">>();
  const isEditing = route.params?.edit;
  const [nameInput, setNameInput] = useState<string>();
  const [emailInput, setEmailInput] = useState<string>();
  const [saving, setSaving] = useState(false);
  const { value, update } = useListenDocument<Profile>(typedProfile.ref());
  const {
    pick,
    isUploading,
    localImage,
    serverImage,
  } = usePickAndUploadImage();
  const avatar = serverImage || value?.avatar || currentUser().photoURL;
  const name = nameInput ?? value?.name ?? currentUser().displayName ?? "";
  const email = emailInput ?? value?.email ?? currentUser().email ?? "";
  const { resetRoute } = useContext(AppRouteContext);
  return (
    <PageContainer>
      {!isEditing && <BigTitle>Choose your{"\n"}name and avatar</BigTitle>}
      <AvatarButton onPress={pick}>
        <Avatar
          source={{
            uri: localImage || avatar || "",
          }}
        />
        {isUploading && <ActivityIndicator />}
      </AvatarButton>
      <TextInput
        autoCapitalize="words"
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={setNameInput}
      />
      <TextInput
        css={`
          margin: 10px 0;
        `}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmailInput}
      />
      <BigButton
        loading={saving}
        disabled={isUploading || !avatar || !name || !email}
        onPress={async () => {
          try {
            if (!validateEmail(email)) {
              Alert.alert("Please input a valid email address");
              return;
            }
            setSaving(true);
            await update({
              avatar: avatar!,
              name,
              email,
              onboardingCompleted: 1,
            });
            setSaving(false);
            if (!isEditing) {
              resetRoute?.();
            } else {
              navigation.goBack();
            }
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

function validateEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default OnboardingProfile;
