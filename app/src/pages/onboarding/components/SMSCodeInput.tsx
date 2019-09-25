import styled from "styled-components";
import { Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import theme from "../../../styles/theme";

const Container = styled(View)`
  flex-direction: row;
  height: 35px;
  margin: 10px 0;
`;

const Digit = (props: { digit?: string }) => (
  <Digit.Container>
    {props.digit ? <Digit.Text>{props.digit}</Digit.Text> : <Digit.Line />}
  </Digit.Container>
);

Digit.Line = styled(View)`
  height: 1px;
  background-color: #c3c3c3;
`;

Digit.Text = styled(Text)`
  font-size: 23px;
  color: ${theme.colors.text};
  text-align: center;
`;

Digit.Container = styled(View)`
  width: 30px;
  justify-content: center;
  margin-right: 18px;
`;

interface DigitInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SMSCodeInput = (props: DigitInputProps) => {
  const input = useRef<TextInput>(null);
  return (
    <View>
      <Container>
        {Array(6)
          .fill(null)
          .map((value, index) => (
            <Digit key={index} digit={props.value[index]} />
          ))}
      </Container>
      <HiddenInput
        autoFocus={true}
        value={props.value}
        onChangeText={props.onChangeText}
        ref={input}
      />
    </View>
  );
};

const HiddenInput = styled(TextInput).attrs({
  keyboardType: "number-pad",
  maxLength: 6
})`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 10px;
  opacity: 0;
`;

export default SMSCodeInput;
