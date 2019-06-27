import React from "react";
import Screens from "./demoscreens";
import { createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  // RN 0.58.6 ships with RNCameraRoll with this issue: https://github.com/facebook/react-native/issues/23755:
  "Module RCTImagePickerManager requires main queue setup since it overrides `init`"
]);

const App = createAppContainer(Screens);

export default App;
