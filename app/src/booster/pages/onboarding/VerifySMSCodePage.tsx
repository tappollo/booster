import React, { useState } from "react";
import { BigButton } from "../../components/Button";
import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { Alert } from "react-native";
import SMSCodeInput from "./components/SMSCodeInput";
import { RouteProp } from "@react-navigation/core";
import { OnboardingStackParams } from "./index";
import TOSAndPrivacyRow from "./components/TOSAndPrivacyRow";
import { StackNavigationProp } from "@react-navigation/stack";

export interface VerifySMSCodePageParams {
  confirmation: (code: string) => Promise<any>;
}

const VerifySMSCodePage = ({
  route,
  navigation
}: {
  route: RouteProp<OnboardingStackParams, "verifySMS">;
  navigation: StackNavigationProp<OnboardingStackParams>;
}) => {
  const confirmation = route.params.confirmation;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <PageContainer>
      <BigTitle>Enter verification code</BigTitle>
      <SMSCodeInput value={code} onChangeText={setCode} />
      <BigButton
        loading={loading}
        disabled={code.length !== 6}
        onPress={async () => {
          try {
            setLoading(true);
            await confirmation(code);
            navigation.push("profile");
          } catch (e) {
            setLoading(false);
            Alert.alert("Error", e.message);
          }
        }}
      >
        Next
      </BigButton>
      <TOSAndPrivacyRow />
    </PageContainer>
  );
};

export default VerifySMSCodePage;
