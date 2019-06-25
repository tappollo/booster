import { TextStyle } from "react-native";

const basePad = 8;

export const pad = (x: number) => basePad * x;

export const margins = {
  tiny: pad(1),
  small: pad(2),
  base: pad(3),
  large: pad(4),
  xLarge: pad(6)
};

export const fonts = {
  heading1: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 33
  } as TextStyle,
  heading2: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 27
  } as TextStyle,
  heading3: {
    fontFamily: "System",
    fontWeight: "500",
    fontSize: 17
  } as TextStyle,
  button: {
    fontFamily: "System",
    fontWeight: "500",
    fontSize: 17
  } as TextStyle,
  body: {
    fontFamily: "System",
    fontWeight: "500",
    fontSize: 15
  } as TextStyle,
  secondary: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 13
  } as TextStyle,
  tertiary: {
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 10
  } as TextStyle
};

export const colors = {
  darkGrey: "#585858",
  grey: "#C3C3C3",
  smoke: "#F0EFF5",
  lightGrey: "#DEDEDE",
  white: "#FFFFFF",
  teal: "#03DAC5",
  blue: "#3178FD",
  red: "#FF3B30"
};

export default {
  margins,
  fonts,
  colors
};
