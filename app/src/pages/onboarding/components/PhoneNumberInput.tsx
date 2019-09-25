import styled from "styled-components";
import {
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  View
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

const Container = styled(View)`
  flex-direction: row;
  border-bottom-width: 1px;
`;

const CountryFlag = styled(Text)`
  font-size: 27px;
`;

const Input = styled(TextInput).attrs({
  maxLength: 16,
  keyboardType: "phone-pad",
  placeholder: "(123) 456-7890",
  placeholderTextColor: theme.colors.placeholder
})`
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
        onPress={props.onSelectCountry}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <CountryFlag>{props.country.flag}</CountryFlag>
        <Icon
          name="md-arrow-dropdown"
          color={theme.colors.placeholder}
          size={18}
        />
        <Text style={{ marginHorizontal: 8, textAlignVertical: "bottom" }}>
          {props.country.dial_code}
        </Text>
      </TouchableOpacity>
      <Input
        style={{ flex: 1 }}
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
