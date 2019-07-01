import { useEffect } from "react";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { auth } from "react-native-firebase";
import OnBoarding from "./onboarding";
import Settings from "./settings";
import StyleGuide from "./styleguide";
import ImageList from "./imagelist";
import Video from "./video";
import ChatTab from "./chat";

const Home = createBottomTabNavigator({
  ChatTab,
  Video,
  ImageList,
  StyleGuide,
  Settings
});

const Dispatcher: NSC<{}, NSO> = ({ navigation }) => {
  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      navigation.navigate(user ? "Home" : "OnBoarding");
    });
  });
  return null;
};

const Switch = createSwitchNavigator({
  Dispatcher,
  OnBoarding,
  Home
});

export default Switch;
