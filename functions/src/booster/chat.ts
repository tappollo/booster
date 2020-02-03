import * as functions from "firebase-functions";
import { firestore } from "firebase-functions";
import * as admin from "firebase-admin";
import { Conversation, Message, UserStatus } from "../types";
import { sendNotificationsTo } from "./notifications";
import { assertAuth, assertString, now } from "./utils";
import { getUserProfile } from "./profiles";

export const startConversation = functions.https.onCall(
  async (data, context) => {
    assertAuth(context.auth);
    assertString(data.target);

    const conversation: Conversation = {
      createdAt: now,
      updatedAt: now,
      createdBy: context.auth.uid,
      userIds: [context.auth.uid, data.target],
      users: {
        [context.auth.uid]: await getUserProfile(context.auth.uid),
        [data.target]: await getUserProfile(data.target)
      },
      available: true
    };
    const added = await admin
      .firestore()
      .collection("chats")
      .add(conversation);
    return {
      id: added.id
    };
  }
);

export const onMessageCreate = firestore
  .document("/chats/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const { chatId } = context.params;
    const message: Message = snapshot.data() as any;

    const update: Partial<Conversation> = {
      updatedAt: message.createdAt,
      lastMessage: message
    };

    const chatRef = admin
      .firestore()
      .collection("chats")
      .doc(chatId);

    await chatRef.update(update);

    const chat: Conversation = (await chatRef.get()).data() as any;

    for (const targetUserId of chat.userIds.filter(
      id => id !== message.createdBy
    )) {
      const userStatus: UserStatus = (
        await admin
          .database()
          .ref(`userStatus/${targetUserId}`)
          .once("value")
      ).val();
      if (
        userStatus &&
        userStatus.online &&
        userStatus.conversationId === chatId
      ) {
        console.log(
          `target user ${targetUserId} is current in the conversation ${chatId}`
        );
        return;
      }
      const conversationCountsRef = admin
        .database()
        .ref(`conversationCounts/${targetUserId}`);
      const existingCounts: { [key: string]: number } =
        (await conversationCountsRef.once("value")).val() || {};
      const currentUnreadCount = Object.values(existingCounts).reduce(
        (a, b) => a + b,
        0
      );
      await conversationCountsRef.update({
        [chatId]: (existingCounts[chatId] ?? 0) + 1
      });
      await sendNotificationsTo(targetUserId, {
        title: message.user.name,
        body: message.content,
        badge: currentUnreadCount + 1
      });
    }
  });
