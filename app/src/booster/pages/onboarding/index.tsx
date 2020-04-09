import { createStackNavigator } from "@react-navigation/stack";
import SelectCountryPage, {
  SelectCountryPageParams,
} from "./SelectCountryPage";
import React, { useContext } from "react";
import VerifySMSCodePage, {
  VerifySMSCodePageParams,
} from "./VerifySMSCodePage";
import { Platform, YellowBox } from "react-native";
import LandingPage from "./LandingPage";
import ContinueWithPhonePage from "./ContinueWithPhonePage";
import OnboardingProfile from "./OnboardingProfile";
import { AppRouteContext } from "../Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type OnboardingStackParams = {
  landing: undefined;
  continueWithPhone: undefined;
  verifySMS: VerifySMSCodePageParams;
  profile: undefined;
};

const OnboardingNavStack = createStackNavigator<OnboardingStackParams>();

const OnboardingNav = () => {
  const { isLoggedIn } = useContext(AppRouteContext);
  return (
    <OnboardingNavStack.Navigator
      initialRouteName={isLoggedIn === "signUp" ? "profile" : "landing"}
      screenOptions={{
        title: " ",
        headerBackTitle: " ",
        headerTintColor: "#585858",
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: "transparent",
        },
        headerLeftContainerStyle: {
          marginLeft: Platform.select({
            ios: 20,
            default: 5,
          }),
        },
      }}
    >
      <OnboardingNavStack.Screen
        name="landing"
        component={LandingPage}
        options={{
          header: () => null,
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

const OnboardingStack = createNativeStackNavigator<OnBoardingParams>();

YellowBox.ignoreWarnings([
  "We found non-serializable values in the navigation state",
]);

const OnBoarding = () => {
  return (
    <OnboardingStack.Navigator initialRouteName="OnboardingNav">
      <OnboardingStack.Screen
        name="OnboardingNav"
        component={OnboardingNav}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="SelectCountryPage"
        component={SelectCountryPage}
        options={{ stackPresentation: "modal" }}
      />
    </OnboardingStack.Navigator>
  );
};

export default React.memo(OnBoarding);
