import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { Text } from "react-native";

export const BigButton = (props: ButtonProps) => {
  return (
    <Button
      dark={true}
      mode="contained"
      {...props}
      contentStyle={[{ height: 58 }, props.contentStyle]}
      style={[{ marginVertical: 12 }, props.style]}
    >
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>{props.children}</Text>
    </Button>
  );
};
