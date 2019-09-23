import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Dispatcher from "./Dispatcher";
import { createStackNavigator } from "react-navigation-stack";
import LandingPage from "./onboarding/LandingPage";
import HomePage from "./home/HomePage";

const Onboarding = createStackNavigator({
  LandingPage
});

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
