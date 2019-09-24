import React, { useState } from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { BigButton } from "../../components/Button";
import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { Caption } from "react-native-paper";
import { Text } from "react-native";
import SMSCodeInput from "./components/SMSCodeInput";

const VerifySMSCodePage: NavigationStackScreenComponent<{}> = ({
  navigation
}) => {
  const [code, setCode] = useState("");
  return (
    <PageContainer>
      <BigTitle>Enter verification code</BigTitle>
      <SMSCodeInput value={code} onChangeText={setCode} />
      <BigButton
        onPress={() => {
          navigation.push("ChooseAddressPage");
        }}
      >
        Next
      </BigButton>
      <Caption>
        By signing up or logging in, you agree to our{" "}
        <Text style={{ fontWeight: "bold" }}>Terms & Conditions</Text> and{" "}
        <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
      </Caption>
    </PageContainer>
  );
};

export default VerifySMSCodePage;
