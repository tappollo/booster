import { Button as PaperButton } from "react-native-paper";
import React from "react";

export const BigButton: typeof PaperButton = props => {
  return (
    <PaperButton {...props} contentStyle={{ height: 50 }}>
      {props.children}
    </PaperButton>
  );
};
