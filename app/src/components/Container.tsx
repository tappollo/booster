import React, { FunctionComponent as SFC } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ScrollViewProps,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

interface ContainerProps extends ScrollViewProps {
  expand?: boolean;
  backward?: boolean;
  scroll?: boolean;
  safe?: boolean;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
}

export const Container: SFC<ContainerProps> = ({
  style,
  children,
  expand,
  scroll,
  backward,
  direction,
  safe,
  contentContainerStyle,
  ...rest
}) => {
  const Wrapper = scroll ? ScrollView : safe ? SafeAreaView : View;
  return (
    <Wrapper
      bounces={false}
      contentContainerStyle={[
        backward ? styles.backward : null,
        contentContainerStyle
      ]}
      style={[
        styles.default,
        scroll ? null : backward ? styles.backward : null,
        expand ? styles.expand : null,
        { flexDirection: direction },
        style
      ]}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export const Column: SFC<ContainerProps> = props =>
  Container({ ...props, direction: "column" });
export const Row: SFC<ContainerProps> = props =>
  Container({ ...props, direction: "row" });

const styles = StyleSheet.create({
  expand: {
    flex: 1
  },
  backward: {
    justifyContent: "flex-end"
  },
  colum: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  default: {}
});

export default Container;
