import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { usePickAndUploadImage } from "../../functions/image";
import { Alert, ScrollView, TextInput } from "react-native";
import { useListenDocument } from "../../functions/firebase/firestoreHooks";
import { currentUser, typedProfile } from "../../functions/user";
import { Profile } from "../../functions/types";
import { ActivityIndicator } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { OnboardingStackParams } from "./index";
import { RouteProp, useRoute } from "@react-navigation/core";
import { HomeNavStackParams } from "../home";
import { useKeyboardManagerOnFocus } from "../../functions/utils";
import dataUri from "data-uri.macro";
import { AppRouteContext } from "../AppRouteContext";

const AvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 122px;
  height: 122px;
  border-radius: 60px;
  align-self: center;
  background-color: #cccccc;
  margin-bottom: 35px;
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

const defaultAvatar = dataUri("./assets/placeholder.png");

const SectionTitle = styled.Text`
  font-weight: 900;
  font-size: 13px;
  color: #8e8e8e;
  letter-spacing: 0.16px;
`;

const Input: typeof TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#d3d3d3",
})`
  color: black;
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 0.2px;
  margin: 8px 0;
  padding: 0;
`;

const OnboardingProfile = ({
  navigation,
}: {
  navigation: StackNavigationProp<OnboardingStackParams>;
}) => {
  const route = useRoute<RouteProp<HomeNavStackParams, "editProfile">>();
  const { resetRoute } = useContext(AppRouteContext);
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
  const avatar =
    serverImage || value?.avatar || currentUser().photoURL || defaultAvatar;
  const name = nameInput ?? value?.name ?? currentUser().displayName ?? "";
  const email = emailInput ?? value?.email ?? currentUser().email ?? "";
  useKeyboardManagerOnFocus(true);
  return (
    <ScrollView
      css={`
        flex: 1;
        padding: 24px;
      `}
    >
      {!isEditing && <BigTitle>Choose your{"\n"}name and avatar</BigTitle>}
      <AvatarButton onPress={pick}>
        <Avatar
          source={{
            uri: localImage || avatar || "",
          }}
        />
        {isUploading && <ActivityIndicator />}
      </AvatarButton>
      <SectionTitle>What’s your name?</SectionTitle>
      <Input
        autoCapitalize="words"
        value={name}
        onChangeText={setNameInput}
        placeholder="John Doe"
      />
      <SectionTitle
        css={`
          margin-top: 50px;
        `}
      >
        What’s your email?
      </SectionTitle>
      <Input
        placeholder="John Doe@gmail.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmailInput}
      />
      <BigButton
        css={`
          margin-top: 50px;
        `}
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
    </ScrollView>
  );
};

function validateEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default OnboardingProfile;
