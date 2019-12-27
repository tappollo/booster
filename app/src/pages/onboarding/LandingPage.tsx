import { BigButton } from "../../components/Button";
import React from "react";
import { PageContainer } from "../../components/Page";
import { View } from "react-native";
import { LoginWithFacebook, LoginWithGoogle } from "./components/SocialButtons";
import { StackNavigationProp } from "@react-navigation/stack";
import { OnboardingStackParams } from "../Routes";

const LandingPage = ({
  navigation
}: {
  navigation: StackNavigationProp<OnboardingStackParams>;
}) => {
  return (
    <PageContainer>
      <View style={{ flex: 1 }} />
      <LoginWithFacebook />
      <LoginWithGoogle />
      <BigButton
        onPress={() => {
          navigation.push("ContinueWithPhonePage");
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
