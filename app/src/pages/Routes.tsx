import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Dispatcher from "./Dispatcher";
import { createStackNavigator } from "react-navigation-stack";
import LandingPage from "./onboarding/LandingPage";
import HomePage from "./home/HomePage";
import ContinueWithPhonePage from "./onboarding/ContinueWithPhonePage";
import VerifySMSCodePage from "./onboarding/VerifySMSCodePage";
import { Platform } from "react-native";

const Onboarding = createStackNavigator(
  {
    LandingPage,
    ContinueWithPhonePage,
    VerifySMSCodePage
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: "#585858",
      headerStyle: {
        borderBottomWidth: 0
      },
      headerLeftContainerStyle: {
        marginLeft: Platform.select({
          ios: 20,
          default: 5
        })
      }
    }
  }
);

const Home = createStackNavigator({
  HomePage
});

const Root = createSwitchNavigator(
  {
    Dispatcher,
    Onboarding,
    Home
  },
  {
    initialRouteName: "Dispatcher"
  }
);

export default createAppContainer(Root);
