import { useEffect, useContext } from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { auth } from "react-native-firebase";
import OnBoarding from "./onboarding";
import Settings from "./settings";
import StyleGuide from "./styleguide";
import ImageList from "./imagelist";
import Upload from "./upload";
import Video from "./video";
import { AuthContext } from "../functions/auth";

const Home = createBottomTabNavigator({
  Video,
  Upload,
  ImageList,
  StyleGuide,
  Settings
});

const Dispatcher: NSC<{}, NSO> = ({ navigation }) => {
  // const user = useContext(AuthContext);
  useEffect(() => {
    // navigation.navigate(user ? "Home" : "OnBoarding");
    // HELP NEEDED: does not work while using above line with context, why?
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
