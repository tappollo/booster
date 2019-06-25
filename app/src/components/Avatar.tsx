import React, { FunctionComponent as SFC } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ViewProps,
  Text,
  ViewStyle,
  Platform,
  ImageSourcePropType
} from "react-native";
import { fonts, colors, margins } from "../styles";
import styled from "styled-components/native";

interface AvatarProps extends ViewProps {
  image?: ImageSourcePropType;
  name?: string;
  size?: "small" | "medium";
  color?: string;
}

const getSize = (size?: string) => (size === "medium" ? 80 : 52);
const Container = styled.View<AvatarProps>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border-radius: ${({ size }) => getSize(size) / 2};
  background-color: ${props => props.color || colors.teal};
`;
const Background = styled.ImageBackground<{ size?: string }>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border-radius: ${({ size }) => getSize(size) / 2};
  align-items: center;
  justify-content: center;
`;
const Name = styled.Text<{ size?: string }>`
  color: ${colors.white}
  font: bold ${({ size }) => (size === "medium" ? 38 : 26)}px System
`;

export const Avatar: SFC<AvatarProps> = ({ image, name, size, ...rest }) => (
  <Container {...rest} size={size}>
    <Background source={image || []} size={size}>
      <Name size={size}>
        {(name || "").split(" ").map(s => s.toUpperCase().substring(0, 1))}
      </Name>
    </Background>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    height: Platform.select({ ios: 88, android: 88 - 24 }),
    flexDirection: "column-reverse",
    backgroundColor: colors.blue,
    alignItems: "center"
  } as ViewStyle,
  titleLabel: {
    color: colors.white,
    ...fonts.heading3,
    margin: margins.small
  }
});

export default Avatar;
