import { currentUser, UserInfo } from "./auth";
import { database, firestore } from "react-native-firebase";
import { useCollection } from "./firestore";
import { Conversation, Doc, UserStatus } from "./types";
import { AppState, AppStateStatus } from "react-native";
import { useEffect } from "react";
import { useDatabaseField } from "./database";

export const useConversations = () => {
  return useCollection<Conversation>(
    firestore()
      .collection("conversations")
      .where(`userIds`, "array-contains", currentUser().uid)
      .orderBy("updatedAt", "desc")
  );
};

export const useAllUsers = () => {
  return useCollection<UserInfo>(firestore().collection("users"));
};

export const useNewContacts = () => {
  const {
    loading: conversationsLoading,
    items: conversations,
    error: conversationError
  } = useConversations();
  const {
    loading: allUsersLoading,
    items: allUsers,
    error: allUserError
  } = useAllUsers();
  const conversationIdLookup: { [userId: string]: Doc<Conversation> } = {};
  conversations.map(c => {
    c.doc.userIds.forEach(u => {
      conversationIdLookup[u] = c;
    });
  });
  const items = allUsers
    .map(doc => ({
      user: doc,
      conversation: conversationIdLookup[doc.id]
    }))
    .filter(d => d.user.id !== currentUser().uid);
  const loading = conversationsLoading || allUsersLoading;
  return {
    error: conversationError || allUserError,
    loading,
    items
  };
};

export const markConversationAsRead = async (chatId: string) => {
  await database()
    .ref(`conversationCounts/${currentUser().uid}/${chatId}`)
    .set(0);
};

export const useUpdatePing = () => {
  useEffect(() => {
    const ref = database().ref(`userStatus/${currentUser().uid}`);
    ref.update({ online: true }).catch();
    ref
      .onDisconnect()
      .update({ disconnectedAt: database.ServerValue.TIMESTAMP, online: false })
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
      ref.onDisconnect().cancel();
      AppState.removeEventListener("change", onAppStateChange);
    };
  }, []);
};

export const useUserStatus = (userId: string) => {
  return useDatabaseField<UserStatus>(`userStatus/${userId}`);
};

export const targetInChat = (conversation: Conversation) => {
  return conversation.userIds.filter(u => u !== currentUser().uid)[0];
};

export const useUnreadCount = (chatId: string) => {
  const { value } = useDatabaseField<number>(
    `conversationCounts/${currentUser().uid}/${chatId}`
  );
  return value;
};
