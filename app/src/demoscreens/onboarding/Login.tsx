import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { signIn } from "../../functions/auth";
import {
  Column,
  Button,
  Heading2,
  Body,
  Tertiary,
  TextField
} from "../../components";
import { colors, margins } from "../../styles";
import DisableIQKeyboardWhenFocused from "../../utils/DisableIQKeyboardWhenFocused";
import { withAlert, withHud } from "../../functions/async";

const Login: NSC<{}, NSO> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassward] = useState("");
  return (
    <Column expand safe style={styles.container}>
      <Column expand scroll>
        <DisableIQKeyboardWhenFocused />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-close" size={44} color={colors.darkGrey} />
        </TouchableOpacity>
        <Heading2 style={styles.title}>Login</Heading2>
        <TextField
          label="Email Address"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <TextField
          label="Password"
          style={styles.input}
          onChangeText={setPassward}
          secureTextEntry
        />
        <Button
          title="Log in with Email"
          style={styles.button}
          onPress={withHud(
            "Loading",
            withAlert(
              "Login Failed",
              e => e.code,
              () =>
                signIn({ email, password }).then(() =>
                  navigation.navigate("Home")
                )
            )
          )}
        />
        <Body style={styles.textButton}>Forget Password</Body>
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
  title: {
    marginBottom: margins.base
  },
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

export default Login;
