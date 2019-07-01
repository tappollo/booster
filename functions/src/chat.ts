import * as functions from "firebase-functions";
import { HttpsError } from "firebase-functions/lib/providers/https";
import * as admin from "firebase-admin";
import { Conversation, Doc } from "./types";

export const getProfile = async (userId: string) => {
  return (await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .get()).data();
};

export const newChat = functions.https.onCall(
  async (data, context): Promise<Doc<Conversation>> => {
    if (context.auth == null) {
      throw new HttpsError("unauthenticated", "User not logged in");
    }
    if (typeof data.target !== "string") {
      throw new HttpsError("invalid-argument", "target need to be a string");
    }

    const conversationRef = admin.firestore().collection("conversations");
    const duplicate = await conversationRef
      .where(
        "_duplicateLookup" as keyof Conversation,
        "==",
        [context.auth.uid, data.target].sort().join(",")
      )
      .get();
    if (!duplicate.empty) {
      return {
        id: duplicate.docs[0].id,
        doc: duplicate.docs[0].data() as any
      };
    }
    const newConversation = await conversationRef.add({
      userDetails: {
        [context.auth.uid]: await getProfile(context.auth.uid),
        [data.target]: await getProfile(data.target)
      },
      userIds: [context.auth.uid, data.target],
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
      _duplicateLookup: [context.auth.uid, data.target].sort().join(",")
    } as Conversation);
    return {
      id: newConversation.id,
      doc: (await newConversation.get()).data() as any
    };
  }
);
