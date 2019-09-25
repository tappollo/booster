import React, { useEffect, useState } from "react";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import { Caption } from "react-native-paper";
import { PageContainer } from "../../components/Page";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Alert, Text } from "react-native";
import PhoneNumberInputBox, {
  defaultCountry
} from "./components/PhoneNumberInput";
import { auth } from "react-native-firebase";
import { VerifySMSCodePageParams } from "./VerifySMSCodePage";

const ContinueWithPhonePage: NavigationStackScreenComponent<{}> = ({
  navigation
}) => {
  useEffect(() => {
    auth().settings.appVerificationDisabledForTesting = true;
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
              country.dial_code + phone
            );
            navigation.push("VerifySMSCodePage", {
              confirmation: confirmation.confirm
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
      <Caption>
        By signing up or logging in, you agree to our{" "}
        <Text style={{ fontWeight: "bold" }}>Terms & Conditions</Text> and{" "}
        <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
      </Caption>
    </PageContainer>
  );
};

export default ContinueWithPhonePage;
