import styled from "styled-components/native";
import {
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import theme from "../../../styles/theme";
import color from "color";

export const defaultCountry: Country = {
  name: "United States",
  dial_code: "+1",
  code: "US",
  flag: "🇺🇸"
};

export interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const Container = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
`;

const CountryFlag = styled.Text`
  font-size: 27px;
`;

const Input: typeof TextInput = styled.TextInput.attrs({
  maxLength: 16,
  keyboardType: "phone-pad",
  placeholder: "(123) 456-7890",
  placeholderTextColor: theme.colors.placeholder
})`
  flex: 1;
  color: ${theme.colors.text};
`;

interface PhoneNumberInputBoxProps {
  country: Country;
  phone?: string;
  onPhoneChange?: (phone: string) => void;
  onSelectCountry?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const formatPhoneNumber = (text: string): string => {
  const zip = text.substring(0, 3);
  const middle = text.substring(3, 6);
  const last = text.substring(6, 10);
  if (text.length > 6) {
    return `(${zip}) ${middle} - ${last}`;
  } else if (text.length > 3) {
    return `(${zip}) ${middle}`;
  } else if (text.length > 0) {
    return `(${zip}`;
  } else {
    return "";
  }
};

const PhoneNumberInputBox = (props: PhoneNumberInputBoxProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <Container
      style={{
        borderBottomColor: focus
          ? theme.colors.primary
          : color(theme.colors.placeholder)
              .alpha(0.3)
              .string()
      }}
    >
      <TouchableOpacity
        css={`
          flex-direction: row;
          align-items: center;
        `}
        onPress={props.onSelectCountry}
      >
        <CountryFlag>{props.country.flag}</CountryFlag>
        <Icon
          name="md-arrow-dropdown"
          color={theme.colors.placeholder}
          size={18}
        />
        <Text
          css={`
            margin: 0 8px;
            text-align-vertical: bottom;
          `}
        >
          {props.country.dial_code}
        </Text>
      </TouchableOpacity>
      <Input
        value={
          props.country.code === "US"
            ? formatPhoneNumber(props.phone || "")
            : props.phone || ""
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={value => {
          const phone = value.replace(/\D/g, "");
          if (props.onPhoneChange) {
            props.onPhoneChange(phone);
          }
        }}
      />
    </Container>
  );
};

export default PhoneNumberInputBox;
