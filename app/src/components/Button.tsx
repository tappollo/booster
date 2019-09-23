import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { Text } from "react-native";

export const BigButton = (props: ButtonProps) => {
  return (
    <Button {...props} mode="contained" contentStyle={{ height: 58 }}>
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>{props.children}</Text>
    </Button>
  );
};
