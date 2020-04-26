import Stripe from "stripe";
import { firestore, https } from "firebase-functions";
import { HttpsError } from "firebase-functions/lib/providers/https";
import {
  usePayments,
  usePrivateProfile,
  useReadonlyProfile,
} from "../utils/profiles";
import { AddPaymentMethodInput } from "../../types";
import * as admin from "firebase-admin";
import { assertNotNull } from "../utils/utils";
import * as configs from "../../server.json";

const stripe = new Stripe(configs.stripeKey, {
  apiVersion: "2020-03-02",
});

async function createCustomer(asUser: string): Promise<string> {
  const customer = await stripe.customers.create({
    description: asUser,
  });
  await useReadonlyProfile(asUser).update({
    stripeCustomerId: customer.id,
  });
  return customer.id;
}

export const _addPayments = async (token: string, asUser: string) => {
  const profile = await useReadonlyProfile(asUser).read();
  const stripeCustomerId =
    profile.stripeCustomerId ?? (await createCustomer(asUser));
  const source = await stripe.customers.createSource(stripeCustomerId, {
    source: token,
  });
  await usePayments(asUser, source.id).update({
    ...source,
    addedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  await usePrivateProfile(asUser).update({ defaultPayment: source as any });
};

export const addPayment = https.onCall(
  async (data: AddPaymentMethodInput, context) => {
    assertNotNull(context.auth);
    console.log(
      `User ${
        context.auth.uid
      } add payment method with token starts with ${data.stripeToken.slice(
        0,
        5
      )}`
    );
    await _addPayments(data.stripeToken, context.auth.uid);
  }
);

export const _deletePayment = async (paymentId: string, asUser: string) => {
  const profile = await useReadonlyProfile(asUser).read();
  const privateProfile = await usePrivateProfile(asUser).read();
  if (profile.stripeCustomerId == null) {
    throw new HttpsError(
      "failed-precondition",
      "User does not have customer id associated"
    );
  }
  await stripe.customers.deleteSource(profile.stripeCustomerId, paymentId);
  if (privateProfile.defaultPayment?.id === paymentId) {
    await usePrivateProfile(asUser).update({ defaultPayment: undefined });
  }
};

export const onDeletePayment = firestore
  .document("/userReadonlyProfiles/{userId}/payments/{paymentId}")
  .onDelete(async (snapshot, context) => {
    const { paymentId, userId } = context.params;
    console.log(`User ${userId} deleted source ${paymentId}`);
    await _deletePayment(paymentId, userId);
  });

export const _pay = async (props: {
  uid: string;
  paymentId: string;
  amountInCents: number;
  description: string;
}) => {
  return await stripe.charges.create({
    amount: props.amountInCents,
    currency: "usd",
    customer: (await useReadonlyProfile(props.uid).read()).stripeCustomerId,
    source: props.paymentId,
    description: props.description,
  });
};

export const _requestRefund = async (chargeId: string) => {
  return await stripe.refunds.create({ charge: chargeId });
};
