import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import { Column, Button, Body } from "../../components";
import { colors, margins } from "../../styles";
import { signInFacebook, signInGoogle } from "../../functions/auth";

const OnBoarding: NSC<{}, NSO> = ({ navigation }) => (
  <Column expand backward style={styles.container}>
    <Column style={styles.bottom}>
      <Button
        inverse
        flat
        style={styles.button}
        title="Continue with Email"
        onPress={() => navigation.navigate("SignUp")}
      />
      <Button
        inverse
        flat
        style={styles.button}
        title="Continue with Phone"
        onPress={() => navigation.navigate("Phone")}
      />
      <Button
        border
        flat
        style={styles.button}
        title="Continue with Facebook"
        onPress={() =>
          signInFacebook()
            .then(() => navigation.navigate("Home"))
            .catch(error => Alert.alert("Login Failed", error.code))
        }
      />
      <Button
        border
        flat
        style={styles.button}
        title="Continue with Google"
        onPress={() =>
          signInGoogle()
            .then(() => navigation.navigate("Home"))
            .catch(error => Alert.alert("Login Failed", error.code))
        }
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Login")}
      >
        <Body style={styles.text}>Have an Account? Log In</Body>
      </TouchableOpacity>
    </Column>
  </Column>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue
  },
  button: {
    marginVertical: margins.tiny * 0.75
  },
  bottom: {
    marginHorizontal: margins.base,
    marginBottom: margins.base
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.white,
    margin: margins.small
  }
});

OnBoarding.navigationOptions = {
  header: null
};

export default OnBoarding;
