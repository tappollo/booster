import React from "react";
import { Caption } from "react-native-paper";
import { Text } from "react-native";
import { openURL } from "../../../functions/utils";
import { privacy, tos } from "../../../../app.json";

const TOSAndPrivacyRow = () => (
  <Caption>
    By signing up or logging in, you agree to our{" "}
    <Text style={{ fontWeight: "bold" }} onPress={() => openURL(tos)}>
      Terms & Conditions
    </Text>{" "}
    and{" "}
    <Text style={{ fontWeight: "bold" }} onPress={() => openURL(privacy)}>
      Privacy Policy
    </Text>
    .
  </Caption>
);

export default TOSAndPrivacyRow;
