import { useEffect } from "react";
import database from "@react-native-firebase/database";
import { currentUserId } from "./user";
import { AppState, AppStateStatus } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { keyOf, useListenQuery } from "./firebase/firestore";
import { Conversation, Profile } from "./types";

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
    loading: conversationLoading
  } = useConversations();
  const userIdsInConversation: { [userId: string]: string } = {};
  conversations.forEach(conv => {
    const userId = conv.doc.userIds.find(id => id !== currentUserId());
    if (userId) {
      userIdsInConversation[userId] = conv.id;
    }
  });

  return {
    items: contacts
      .filter(contact => contact.id !== currentUserId())
      .map(contact => ({
        ...contact,
        conversationId: userIdsInConversation[contact.id]
      })),
    loading: contactLoading || conversationLoading
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
          online: false
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
      ref
        .onDisconnect()
        .cancel()
        .catch();
      AppState.removeEventListener("change", onAppStateChange);
    };
  }, []);
};
