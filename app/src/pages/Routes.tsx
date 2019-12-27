import HomePage from "./home/HomePage";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationNativeContainer,
  NavigationState
} from "@react-navigation/native";
import React from "react";
import { useIsLoggedIn } from "../functions/user";
import LandingPage from "./onboarding/LandingPage";
import ContinueWithPhonePage from "./onboarding/ContinueWithPhonePage";
import VerifySMSCodePage, {
  VerifySMSCodePageParams
} from "./onboarding/VerifySMSCodePage";
import SelectCountryPage, {
  SelectCountryPageParams
} from "./onboarding/SelectCountryPage";
import { Platform } from "react-native";

export type OnboardingStackParams = {
  VerifySMSCodePage: VerifySMSCodePageParams;
  LandingPage: undefined;
  ContinueWithPhonePage: undefined;
};

const OnboardingNavStack = createStackNavigator<OnboardingStackParams>();

const OnboardingNav = () => {
  return (
    <OnboardingNavStack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
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
        name="LandingPage"
        component={LandingPage}
        options={{
          header: () => null
        }}
      />
      <OnboardingNavStack.Screen
        name="ContinueWithPhonePage"
        component={ContinueWithPhonePage}
        options={{
          headerBackTitle: " ",
          title: " "
        }}
      />
      <OnboardingNavStack.Screen
        name="VerifySMSCodePage"
        component={VerifySMSCodePage}
        options={{
          headerBackTitle: " ",
          title: " "
        }}
      />
    </OnboardingNavStack.Navigator>
  );
};

export type OnBoardingParams = {
  SelectCountryPage: SelectCountryPageParams;
  OnboardingNav: undefined;
};

const OnboardingStack = createStackNavigator<OnBoardingParams>();

const OnBoarding = (props: {
  onStateChange?: (state: NavigationState | undefined) => void;
}) => {
  return (
    <NavigationNativeContainer onStateChange={props.onStateChange}>
      <OnboardingStack.Navigator
        mode="modal"
        initialRouteName="OnboardingNav"
        headerMode="none"
      >
        <OnboardingStack.Screen
          name="SelectCountryPage"
          component={SelectCountryPage}
        />
        <OnboardingStack.Screen
          name="OnboardingNav"
          component={OnboardingNav}
        />
      </OnboardingStack.Navigator>
    </NavigationNativeContainer>
  );
};

const Stack = createStackNavigator();
const Home = (props: {
  onStateChange?: (state: NavigationState | undefined) => void;
}) => {
  return (
    <NavigationNativeContainer onStateChange={props.onStateChange}>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

const Routes = (props: {
  onStateChange?: (state: NavigationState | undefined) => void;
}) => {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn == null) {
    return null;
  }
  return isLoggedIn ? (
    <Home onStateChange={props.onStateChange} />
  ) : (
    <OnBoarding onStateChange={props.onStateChange} />
  );
};

export default Routes;
