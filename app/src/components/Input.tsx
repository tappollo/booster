import styled from "styled-components";
import { TextInput, TextInputProps } from "react-native-paper";
import { View } from "react-native";
import React from "react";

const Input = styled(TextInput)`
  margin: 0 -12px;
  background-color: transparent;
`;

const Clip = styled(View)`
  overflow: hidden;
`;

export const ClippedInput = (props: TextInputProps) => {
  return (
    <Clip>
      <Input {...props} />
    </Clip>
  );
};
