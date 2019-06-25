import React, { FunctionComponent as SFC } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { fonts, colors } from "../styles";

interface TypographyProps extends TextProps {
  color?: string;
  weight?: string;
}

const HOCText: (xStyle: TextStyle) => SFC<TypographyProps> = xStyle => ({
  children,
  style,
  color = colors.darkGrey,
  weight,
  ...rest
}) => (
  <Text
    style={[
      xStyle,
      ({
        color,
        ...(weight ? { fontWeight: weight } : null)
      } as unknown) as TextProps,
      style
    ]}
    {...rest}
  >
    {children}
  </Text>
);

export const Heading1 = HOCText(fonts.heading1);
export const Heading2 = HOCText(fonts.heading2);
export const Heading3 = HOCText(fonts.heading3);
export const Body = HOCText(fonts.body);
export const Secondary = HOCText(fonts.secondary);
export const Tertiary = HOCText(fonts.tertiary);
