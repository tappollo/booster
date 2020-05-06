import stripe from "tipsi-stripe";
import * as config from "../../app.json";
import functions from "@react-native-firebase/functions";
import { AddPaymentMethodInput } from "./types";
import { Alert } from "react-native";

export const addPaymentFromStripe = async () => {
  stripe.setOptions({
    publishableKey: config.stripePublishKeys,
  });
  try {
    const { tokenId } = await stripe.paymentRequestWithCardForm({} as any);
    await functions().httpsCallable("payments-addPayment")({
      stripeToken: tokenId,
    } as AddPaymentMethodInput);
  } catch (e) {
    if (e.code === "cancelled") {
      return;
    }
    Alert.alert(e.message);
  }
};
