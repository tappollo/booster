import { AppRegistry } from "react-native";
import App from "./src/App";
import { enableScreens } from "react-native-screens";
import "@react-native-firebase/app";

enableScreens();

AppRegistry.registerComponent("booster", () => App);
