import React, { useEffect, useState } from "react";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import { PageContainer } from "../../components/Page";
import { Alert } from "react-native";
import PhoneNumberInputBox, {
  defaultCountry,
} from "./components/PhoneNumberInput";
import auth from "@react-native-firebase/auth";
import { VerifySMSCodePageParams } from "./VerifySMSCodePage";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/core";
import { OnBoardingParams, OnboardingStackParams } from "./index";
import TOSAndPrivacyRow from "./components/TOSAndPrivacyRow";

const ContinueWithPhonePage = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OnBoardingParams>,
    StackNavigationProp<OnboardingStackParams>
  >;
}) => {
  useEffect(() => {
    if (__DEV__) {
      auth().settings.appVerificationDisabledForTesting = true;
    }
  }, []);
  const [country, setCountry] = useState(defaultCountry);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <PageContainer>
      <BigTitle>Enter your{"\n"}mobile number</BigTitle>
      <PhoneNumberInputBox
        onSelectCountry={() => {
          navigation.push("SelectCountryPage", { onSelect: setCountry });
        }}
        country={country}
        phone={phone}
        onPhoneChange={setPhone}
      />
      <BigButton
        loading={loading}
        disabled={phone.length === 0}
        onPress={async () => {
          try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(
              country.dial_code + phone,
              true
            );
            navigation.push("verifySMS", {
              confirmation: confirmation.confirm.bind(confirmation),
            } as VerifySMSCodePageParams);
          } catch (e) {
            if (e.code !== "auth/popup-closed-by-user") {
              Alert.alert("Error", e.message);
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        Send Verification Code
      </BigButton>
      <TOSAndPrivacyRow />
    </PageContainer>
  );
};

export default ContinueWithPhonePage;
