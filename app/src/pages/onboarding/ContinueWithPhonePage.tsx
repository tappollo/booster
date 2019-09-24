import React from "react";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import { Caption } from "react-native-paper";
import { PageContainer } from "../../components/Page";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Text } from "react-native";

const ContinueWithPhonePage: NavigationStackScreenComponent<{}> = ({
  navigation
}) => {
  return (
    <PageContainer>
      <BigTitle>Enter your{"\n"}mobile number</BigTitle>
      <BigButton
        onPress={() => {
          navigation.push("VerifySMSCodePage");
        }}
      >
        Send Verification Code
      </BigButton>
      <Caption>
        By signing up or logging in, you agree to our{" "}
        <Text style={{ fontWeight: "bold" }}>Terms & Conditions</Text> and{" "}
        <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
      </Caption>
    </PageContainer>
  );
};

export default ContinueWithPhonePage;
