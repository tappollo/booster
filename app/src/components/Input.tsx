import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import React from "react";

const Input = styled(TextInput)`
  margin: 0 -12px;
  background-color: transparent;
`;

const Clip = styled(View)`
  overflow: hidden;
`;

export const ClippedInput: typeof TextInput = props => {
  return (
    <Clip>
      <Input {...props} />
    </Clip>
  );
};
