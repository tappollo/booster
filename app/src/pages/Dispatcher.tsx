import {
  NavigationScreenComponent,
  SwitchNavigatorConfig
} from "react-navigation";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";

const Dispatcher: NavigationScreenComponent<SwitchNavigatorConfig, {}> = ({
  navigation
}) => {
  useEffect(() => {
    return auth().onAuthStateChanged(async user => {
      if (user == null) {
        navigation.navigate("Onboarding");
        return;
      }
      navigation.navigate("Home");
    });
  }, [navigation]);
  return null;
};

export default Dispatcher;
