import React from "react";
import { Button } from "react-native-paper";
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

export const BigButton: typeof Button = props => {
  return (
    <Button
      dark={true}
      mode="contained"
      {...props}
      contentStyle={
        [styles.content, props.contentStyle] as StyleProp<ViewStyle>
      }
      style={[styles.container, props.style] as StyleProp<ViewStyle>}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    height: 58
  },
  container: {
    marginVertical: 12
  },
  text: {
    fontSize: 17,
    fontWeight: "bold"
  }
});
