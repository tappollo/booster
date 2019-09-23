import React from "react";
import { Button, ButtonProps } from "react-native-paper";

export const BigButton = (props: ButtonProps) => {
  return (
    <Button {...props} contentStyle={{ height: 58 }}>
      {props.children}
    </Button>
  );
};
