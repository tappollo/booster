import React, { useContext, useEffect, useState } from "react";
import { BigButton } from "../../components/Button";
import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { Alert } from "react-native";
import SMSCodeInput from "./components/SMSCodeInput";
import { RouteProp } from "@react-navigation/core";
import { OnboardingStackParams } from "./index";
import TOSAndPrivacyRow from "./components/TOSAndPrivacyRow";
import { StackNavigationProp } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { typedReadonlyProfile } from "../../functions/user";
import { sleep } from "../../functions/utils";
import { AppRouteContext } from "../AppRouteContext";

export interface VerifySMSCodePageParams {
  confirmation: (code: string) => Promise<any>;
}

const waitForUserProfileToExist = async () => {
  try {
    await typedReadonlyProfile.read({ source: "server" });
  } catch (e) {
    await sleep(1000);
    await waitForUserProfileToExist();
  }
};

const VerifySMSCodePage = ({
  route,
}: {
  route: RouteProp<OnboardingStackParams, "verifySMS">;
  navigation: StackNavigationProp<OnboardingStackParams>;
}) => {
  const confirmation = route.params.confirmation;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetRoute } = useContext(AppRouteContext);
  useEffect(() => {
    return auth().onAuthStateChanged(async (user) => {
      if (user == null) {
        return;
      }
      await waitForUserProfileToExist();
      resetRoute?.();
    });
  }, [resetRoute]);
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
