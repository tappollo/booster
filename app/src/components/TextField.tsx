import React, { FunctionComponent as SFC } from "react";
import {
  TextField as MTTextField,
  TextFieldProps
} from "react-native-material-textfield";
import { StyleSheet } from "react-native";
import { colors, fonts, margins } from "../styles";

export const TextField: SFC<TextFieldProps> = ({ style, ...rest }) => (
  <MTTextField
    textColor={colors.darkGrey}
    baseColor={colors.grey}
    tintColor={colors.blue}
    errorColor={colors.red}
    fontSize={fonts.body.fontSize}
    labelFontSize={fonts.tertiary.fontSize}
    labelHeight={margins.small}
    style={[fonts.body]}
    containerStyle={style}
    labelTextStyle={fonts.tertiary}
    {...rest}
    prefix={undefined}
    suffix={undefined}
    title={undefined}
  />
);

export default TextField;
