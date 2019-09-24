import styled from "styled-components";
import { Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { NavigationEvents } from "react-navigation";
import theme from "../../../styles/theme";

const Container = styled(View)`
  flex-direction: row;
  height: 35px;
  margin: 0 28px;
`;

const Digit = (props: { digit?: string; active: boolean }) => (
  <Digit.Container
    style={{
      borderBottomColor: props.active
        ? theme.colors.text
        : theme.colors.disabled
    }}
  >
    {props.digit ? <Digit.Text>{props.digit}</Digit.Text> : null}
  </Digit.Container>
);

Digit.Text = styled(Text)`
  font-size: 27px;
  color: ${theme.colors.text};
  text-align: center;
`;

Digit.Container = styled(View)`
  flex: 1;
  max-width: 40px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  margin-right: 9px;
`;

interface DigitInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SMSCodeInput = (props: DigitInputProps) => {
  const input = useRef<TextInput>(null);
  return (
    <View>
      <NavigationEvents
        onDidFocus={() => {
          if (input.current) {
            input.current.focus();
          }
        }}
      />
      <Container>
        {Array(6)
          .fill(null)
          .map((value, index) => (
            <Digit
              key={index}
              digit={props.value[index]}
              active={props.value.length > index}
            />
          ))}
      </Container>
      <HiddenInput
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
