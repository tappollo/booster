import React, { FunctionComponent as SFC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";
import { fonts, colors, margins } from "../styles";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  inverse?: boolean;
  border?: boolean;
  flat?: boolean;
}

const Button: SFC<ButtonProps> = ({
  title,
  style,
  inverse,
  border,
  flat,
  ...rest
}) => (
  <TouchableOpacity
    style={[
      styles.buttonDefault,
      flat ? null : styles.shadow,
      border ? styles.border : null,
      inverse ? styles.inverse : styles.normal,
      style
    ]}
    {...rest}
  >
    <Text
      style={[fonts.button, inverse ? styles.titleInverse : styles.titleNormal]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  normal: {
    backgroundColor: colors.blue
  },
  inverse: {
    backgroundColor: colors.white
  },
  shadow: {
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 }
  },
  buttonDefault: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 24
  },
  titleNormal: {
    color: colors.white
  },
  titleInverse: {
    color: colors.blue
  },
  border: {
    borderColor: colors.white,
    borderWidth: 2
  }
});

export default Button;
