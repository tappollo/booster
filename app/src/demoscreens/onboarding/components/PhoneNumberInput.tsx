import styled from "styled-components";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Column, Body, Row } from "../../../components";
import { colors, fonts, margins } from "../../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
// import { Country } from '../CountryListPage';

export interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const CountryFlag = styled(Text)`
  font-size: 27px;
`;

const Input = styled(TextInput).attrs({
  maxLength: 16,
  keyboardType: "phone-pad",
  placeholder: "(123) 456-7890"
})``;

interface PhoneNumberInputBoxProps {
  country: Country;
  phone?: string;
  onPhoneChange?: (phone: string) => void;
  onSelectCountry?: () => void;
  style?: StyleProp<ViewStyle>;
  innerRef?: (input: any) => void;
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
    <Column
      style={{
        borderBottomColor: focus ? colors.blue : colors.grey,
        borderBottomWidth: 1,
        marginVertical: 50
      }}
    >
      <Row>
        <TouchableOpacity
          onPress={props.onSelectCountry}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <CountryFlag>{props.country.flag}</CountryFlag>
          <Icon name="md-arrow-dropdown" color={colors.grey} size={18} />
          <Body style={{ marginHorizontal: 8, textAlignVertical: "bottom" }}>
            {props.country.dial_code}
          </Body>
        </TouchableOpacity>
        <Input
          placeholderTextColor={colors.grey}
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
      </Row>
    </Column>
  );
};

export default PhoneNumberInputBox;
