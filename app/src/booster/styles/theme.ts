import { DefaultTheme, Theme } from "react-native-paper";
import { DefaultTheme as NavigationTheme } from "@react-navigation/native";

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default theme;

export const navigationTheme = {
  ...NavigationTheme,
  colors: {
    ...NavigationTheme.colors,
    background: "white",
    tintColor: "#752aff",
  },
};
