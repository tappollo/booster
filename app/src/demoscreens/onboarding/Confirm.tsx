import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import RNProgressHud from "react-native-progress-display";
import {
  Column,
  Button,
  Heading2,
  Body,
  Tertiary,
  TextField
} from "../../components";
import { colors, margins } from "../../styles";
import { ConfirmationResult, activateWithCode } from "../../functions/auth";

const Confirm: NSC<{ result: ConfirmationResult }, NSO> = ({ navigation }) => {
  const [code, setCode] = useState("");
  return (
    <Column expand safe style={styles.container}>
      <Column expand scroll>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-close" size={44} color={colors.darkGrey} />
        </TouchableOpacity>
        <Heading2 style={styles.title}>Enter your Code</Heading2>
        <Body style={{ marginTop: margins.tiny }}>
          We sent it to +00 000 0000 0000
        </Body>
        <TextField
          label="Enter the code"
          style={styles.input}
          onChangeText={setCode}
        />
        <Button
          title="Get Started"
          style={styles.button}
          onPress={() => {
            RNProgressHud.showWithStatus("Verifing");
            const result = navigation.getParam("result");
            activateWithCode(code, result)
              .then(() => {
                RNProgressHud.dismiss();
                navigation.navigate("Home");
              })
              .catch(error => {
                RNProgressHud.dismiss();
                Alert.alert("Login Failed", error.code);
              });
          }}
        />
        <Tertiary style={styles.tertiary}>
          By signing up or logging in, you agree to our{" "}
          <Tertiary style={styles.underline}>Terms & Conditions</Tertiary> and{" "}
          <Tertiary style={styles.underline}>Privacy Policy</Tertiary>
        </Tertiary>
      </Column>
    </Column>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: margins.base,
    backgroundColor: colors.white
  },
  title: {},
  input: {
    marginBottom: margins.small
  },
  button: {
    marginBottom: margins.small
  },
  textButton: {
    marginBottom: margins.small,
    color: colors.blue
  },
  tertiary: {},
  underline: {
    fontWeight: "500",
    textDecorationLine: "underline"
  }
});

export default Confirm;
