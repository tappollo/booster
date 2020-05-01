require("react-native").unstable_enableLogBox();
import "react-native-get-random-values";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { enableScreens } from "react-native-screens";
import "@react-native-firebase/app";
import * as Sentry from "@sentry/react-native";
import { env } from "./src/app.json";

Sentry.init({
  dsn: "TODO",
  environment: env,
  enabled: !__DEV__,
  debug: __DEV__,
});

enableScreens();

AppRegistry.registerComponent("booster", () => App);
