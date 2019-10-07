import { BigButton } from "../../components/Button";
import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { PageContainer } from "../../components/Page";
import { View } from "react-native";
import { LoginWithFacebook } from "./components/SocialButtons";

const LandingPage: NavigationStackScreenComponent<{}> = ({ navigation }) => {
  return (
    <PageContainer>
      <View style={{ flex: 1 }} />
      <LoginWithFacebook />
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
