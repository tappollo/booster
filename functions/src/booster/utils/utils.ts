import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/lib/providers/https";

export const now = admin.firestore.FieldValue.serverTimestamp() as any;

export function assertAuth<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new HttpsError("unauthenticated", "You are not authenticated");
  }
}

export function assertString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new HttpsError("invalid-argument", `${val} is not a string`);
  }
}

export function compose<A, B, C>(l: (a: A) => B, r: (b: B) => C): (a: A) => C {
  return a => r(l(a));
}
