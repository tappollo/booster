import { useCallback, useEffect } from "react";
import database from "@react-native-firebase/database";
import { currentUserId } from "./user";
import { AppState, AppStateStatus } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { keyOf, useListenQuery } from "./firebase/firestoreHooks";
import { Conversation, Doc, Message, Profile, UserStatus } from "./types";
import { useListenDatabase } from "./firebase/database";
import functions from "@react-native-firebase/functions";

export const useConversations = () => {
  return useListenQuery<Conversation>(
    firestore()
      .collection("chats")
      .where(keyOf<Conversation>("available"), "==", true)
      .where(keyOf<Conversation>("userIds"), "array-contains", currentUserId())
      .orderBy("updatedAt", "desc")
  );
};

export const useNewContacts = () => {
  const { value: contacts = [], loading: contactLoading } = useListenQuery<
    Profile
  >(firestore().collection("userProfiles"));
  const {
    value: conversations = [],
    loading: conversationLoading,
  } = useConversations();
  const userIdsInConversation: { [userId: string]: string } = {};
  conversations.forEach((conversation) => {
    const userId = conversation.doc.userIds.find(
      (id) => id !== currentUserId()
    );
    if (userId) {
      userIdsInConversation[userId] = conversation.id;
    }
  });

  return {
    value: contacts
      .filter((contact) => contact.id !== currentUserId())
      .map((contact) => ({
        ...contact,
        conversationId: userIdsInConversation[contact.id],
      })),
    loading: contactLoading || conversationLoading,
  };
};

const getMessagesRef = (chatId: string) => {
  return firestore().collection("chats").doc(chatId).collection("messages");
};

export const startConversation = async (target: string): Promise<string> => {
  const result = await functions().httpsCallable("chat-startConversation")({
    target,
  });
  return result.data.id;
};

export const useUpdateStatus = (chatId: string) => {
  useEffect(() => {
    updateUserStatus({ conversationId: chatId }).catch();
    markConversationAsRead(chatId).catch();
    return () => {
      markConversationAsRead(chatId).catch();
      removeCurrentConversationID().catch();
    };
  }, [chatId]);
};

export const useMessages = (
  chatId: string
): {
  messages: Array<Doc<Message>>;
  send: (message: Message) => Promise<void>;
} => {
  const { value: messages = [] } = useListenQuery<Message>(
    getMessagesRef(chatId).orderBy("createdAt", "desc")
  );
  const send = useCallback(
    async (message: Message) => {
      await getMessagesRef(chatId).add(message as any);
    },
    [chatId]
  );
  return {
    messages,
    send,
  };
};

export const useUpdatePing = () => {
  useEffect(() => {
    const ref = database().ref(`userStatus/${currentUserId()}`);
    ref
      .update({ online: true })
      .then(() => {
        return ref.onDisconnect().update({
          disconnectedAt: database.ServerValue.TIMESTAMP,
          online: false,
        });
      })
      .catch();
    const onAppStateChange = (status: AppStateStatus) => {
      if (status === "active") {
        ref.update({ online: true }).catch();
      } else {
        ref.update({ online: false }).catch();
      }
    };
    AppState.addEventListener("change", onAppStateChange);
    return () => {
      ref.onDisconnect().cancel().catch();
      AppState.removeEventListener("change", onAppStateChange);
    };
  }, []);
};

export const useUserStatus = (userId: string) => {
  return useListenDatabase<UserStatus>(database().ref(`userStatus/${userId}`));
};

export const updateUserStatus = async (userStatus: Partial<UserStatus>) => {
  await database().ref(`userStatus/${currentUserId()}`).update(userStatus);
};

export const markConversationAsRead = async (conversationId: string) => {
  await database()
    .ref(`conversationCounts/${currentUserId()}/${conversationId}`)
    .set(0);
};

export const removeCurrentConversationID = async () => {
  await database().ref(`userStatus/${currentUserId()}/conversationId`).remove();
};

export const useUnreadCount = (conversationId: string) => {
  return useListenDatabase<number>(
    database().ref(`conversationCounts/${currentUserId()}/${conversationId}`)
  );
};

export const targetIn = (conversation: Conversation) => {
  const me = currentUserId();
  return conversation.userIds.filter((id) => id !== me)[0];
};

export const targetUserIn = (conversation: Conversation) => {
  const targetId = targetIn(conversation);
  return conversation.users[targetId];
};
