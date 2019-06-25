import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Column,
  Button,
  Heading2,
  Tertiary,
  TextField
} from "../../components";
import { colors, margins } from "../../styles";
import { signUp } from "../../functions/auth";
import { withAlert, withHud } from "../../functions/async";

const SignUp: NSC<{}, NSO> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassward] = useState("");
  return (
    <Column expand safe style={styles.container}>
      <Column expand scroll>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-close" size={44} color={colors.darkGrey} />
        </TouchableOpacity>
        <Heading2 style={styles.title}>Sign Up</Heading2>
        <TextField
          label="Email Address"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextField
          label="Username"
          style={styles.input}
          onChangeText={setUsername}
        />
        <TextField
          label="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassward}
        />
        <Button
          title="Get Started"
          style={styles.button}
          onPress={withHud(
            "Loading",
            withAlert(
              "Sign Up Failed",
              e => e.code,
              () =>
                signUp({ email, password }).then(() =>
                  navigation.navigate("Home")
                )
            )
          )}
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

export default SignUp;
