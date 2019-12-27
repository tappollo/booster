import HomePage from "./home/HomePage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationNativeContainer } from "@react-navigation/native";
import React from "react";
import { useIsLoggedIn } from "../functions/user";
import LandingPage from "./onboarding/LandingPage";
import ContinueWithPhonePage from "./onboarding/ContinueWithPhonePage";
import VerifySMSCodePage, {
  VerifySMSCodePageParams
} from "./onboarding/VerifySMSCodePage";
import SelectCountryPage from "./onboarding/SelectCountryPage";

const Stack = createStackNavigator();

export type OnboardingStackParams = {
  VerifySMSCodePage: VerifySMSCodePageParams;
  LandingPage: undefined;
  ContinueWithPhonePage: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackParams>();

const OnboardingNav = () => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen name="LandingPage" component={LandingPage} />
      <OnboardingStack.Screen
        name="ContinueWithPhonePage"
        component={ContinueWithPhonePage}
      />
      <OnboardingStack.Screen
        name="VerifySMSCodePage"
        component={VerifySMSCodePage}
      />
    </OnboardingStack.Navigator>
  );
};

const OnBoarding = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="SelectCountryPage" component={SelectCountryPage} />
      <Stack.Screen name="OnboardingNav" component={OnboardingNav} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn == null) {
    return null;
  }
  return (
    <NavigationNativeContainer>
      {isLoggedIn ? <Home /> : <OnBoarding />}
    </NavigationNativeContainer>
  );
};

export default Routes;
