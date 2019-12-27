import { BigButton } from "../../components/Button";
import React from "react";
import { PageContainer } from "../../components/Page";
import { View } from "react-native";
import { LoginWithFacebook, LoginWithGoogle } from "./components/SocialButtons";
import { useNavigation } from "@react-navigation/core";

const LandingPage = () => {
  const navigation = useNavigation();
  return (
    <PageContainer>
      <View style={{ flex: 1 }} />
      <LoginWithFacebook />
      <LoginWithGoogle />
      <BigButton
        onPress={() => {
          navigation.navigate("ContinueWithPhonePage");
        }}
      >
        Continue with Phone
      </BigButton>
    </PageContainer>
  );
};

LandingPage.navigationOptions = {
  header: null
};

export default LandingPage;
