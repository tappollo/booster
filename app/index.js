import { AppRegistry } from "react-native";
import App from "./src/App";
import { useScreens } from "react-native-screens";
import "@react-native-firebase/app";

useScreens();

AppRegistry.registerComponent("booster", () => App);
