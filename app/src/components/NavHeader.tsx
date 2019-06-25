import React, { FunctionComponent as SFC, useState } from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  Text,
  ViewStyle,
  Animated,
  Platform
} from "react-native";
import { fonts, colors, margins } from "../styles";

interface HeaderProps extends ViewProps {
  title: string;
}

const Header: SFC<HeaderProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.titleLabel}>{title}</Text>
  </View>
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

const MAX_HEIGHT = 124;
const MIN_HEIGHT = 88;

export const useShrinkHeader = () => {
  const [offset] = useState(new Animated.Value(0));
  const height = (range = [MAX_HEIGHT, MIN_HEIGHT]) =>
    offset.interpolate({
      inputRange: [0, 80],
      outputRange: range,
      extrapolate: "clamp"
    });
  const onScrollHook = Animated.event([
    { nativeEvent: { contentOffset: { y: offset } } }
  ]);
  const SHeader: SFC<ViewProps> = ({ style, children, ...props }) => (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: height(),
          backgroundColor: colors.blue
        },
        style
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
  return [SHeader, onScrollHook, height] as [
    SFC<ViewProps>,
    (x: any) => void,
    (r?: number[]) => Animated.AnimatedInterpolation
  ];
};

export default Header;
