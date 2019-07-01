import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { withAlert } from "../../functions/async";
import { signInWithPhone } from "../../functions/auth";
import { Body, Button, Column, Heading2, Tertiary } from "../../components";
import PhoneNumberInput from "./components/PhoneNumberInput";
import { colors, margins } from "../../styles";
import Countries from "./Countries";
import Confirm from "./Confirm";
import DisableIQKeyboardWhenFocused from "../chat/components/DisableIQKeyboardWhenFocused";

const US = {
  name: "United States",
  dial_code: "+1",
  code: "US",
  flag: "🇺🇸"
};

const PhoneLogin: NSC<{}, NSO> = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(US);
  return (
    <Column expand safe style={styles.container}>
      <Modal visible={showCountry} animated>
        <Countries
          onDone={country => {
            if (country) {
              setCurrentCountry(country);
            }
            setShowCountry(false);
          }}
        />
      </Modal>
      <Column expand scroll>
        <DisableIQKeyboardWhenFocused />
        <TouchableOpacity
          onPress={() => {
            navigation.popToTop();
          }}
        >
          <Icon name="ios-close" size={44} color={colors.darkGrey} />
        </TouchableOpacity>
        <Heading2 style={styles.title}>Enter your mobile number</Heading2>
        <PhoneNumberInput
          country={currentCountry}
          onSelectCountry={() => setShowCountry(true)}
          phone={phone}
          onPhoneChange={setPhone}
        />
        <Button
          title="Log in with Phone"
          style={styles.button}
          onPress={withAlert(
            "Login Failed",
            e => e.code,
            () =>
              signInWithPhone(`${currentCountry.dial_code}${phone}`).then(
                result => navigation.navigate("Confirm", { result })
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

const Navigator = createStackNavigator(
  {
    PhoneLogin,
    Confirm
  },
  {
    initialRouteName: "PhoneLogin",
    headerMode: "none"
  }
);

export default Navigator;
