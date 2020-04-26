import { _addPayments, _deletePayment, _pay, _requestRefund } from "./payment";
import { testUser } from "../../order/order.test";
import { collection } from "../utils/firestore";

it("should payments", async function () {
  await _addPayments("tok_visa", testUser);
  const payments = await collection("userReadonlyProfiles")
    .doc(testUser)
    .collection("payments")
    .get();
  console.log(payments.docs.map((p) => p.data()));
  await _deletePayment(payments.docs[0].id, testUser);
});

it("should be able to charge", async function () {
  const payments = await collection("userReadonlyProfiles")
    .doc(testUser)
    .collection("payments")
    .get();

  const paymentId = payments.docs[0].get("id");
  console.log(
    await _pay({
      uid: testUser,
      description: "Unit Test",
      paymentId,
      amountInCents: 50,
    })
  );
});

it("should be able to refund", async function () {
  await _requestRefund("ch_1GaMS3E5qqQ2Pr0jBOBWq6NH");
});
