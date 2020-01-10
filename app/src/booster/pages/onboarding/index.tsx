import { createStackNavigator } from "@react-navigation/stack";
import SelectCountryPage, {
  SelectCountryPageParams
} from "./SelectCountryPage";
import React from "react";
import VerifySMSCodePage, {
  VerifySMSCodePageParams
} from "./VerifySMSCodePage";
import { Platform } from "react-native";
import LandingPage from "./LandingPage";
import ContinueWithPhonePage from "./ContinueWithPhonePage";
import OnboardingProfile from "./OnboardingProfile";

export type OnboardingStackParams = {
  landing: undefined;
  continueWithPhone: undefined;
  verifySMS: VerifySMSCodePageParams;
  profile: undefined;
};

const OnboardingNavStack = createStackNavigator<OnboardingStackParams>();

const OnboardingNav = () => {
  return (
    <OnboardingNavStack.Navigator
      initialRouteName="landing"
      screenOptions={{
        title: " ",
        headerBackTitle: " ",
        headerTintColor: "#585858",
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: "transparent"
        },
        headerLeftContainerStyle: {
          marginLeft: Platform.select({
            ios: 20,
            default: 5
          })
        }
      }}
    >
      <OnboardingNavStack.Screen
        name="landing"
        component={LandingPage}
        options={{
          header: () => null
        }}
      />
      <OnboardingNavStack.Screen
        name="continueWithPhone"
        component={ContinueWithPhonePage}
      />
      <OnboardingNavStack.Screen
        name="verifySMS"
        component={VerifySMSCodePage}
      />
      <OnboardingNavStack.Screen name="profile" component={OnboardingProfile} />
    </OnboardingNavStack.Navigator>
  );
};

export type OnBoardingParams = {
  SelectCountryPage: SelectCountryPageParams;
  OnboardingNav: undefined;
};

const OnboardingStack = createStackNavigator<OnBoardingParams>();

const OnBoarding = () => {
  return (
    <OnboardingStack.Navigator
      mode="modal"
      initialRouteName="OnboardingNav"
      headerMode="none"
    >
      <OnboardingStack.Screen
        name="SelectCountryPage"
        component={SelectCountryPage}
      />
      <OnboardingStack.Screen name="OnboardingNav" component={OnboardingNav} />
    </OnboardingStack.Navigator>
  );
};

export default React.memo(OnBoarding);
