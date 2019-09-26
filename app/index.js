import { AppRegistry } from "react-native";
import App from "./src/App";
import { useScreens } from "react-native-screens";

useScreens();

AppRegistry.registerComponent("booster", () => App);
