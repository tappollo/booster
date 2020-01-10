import * as React from "react";
import { useConversations, useUpdatePing } from "../../functions/chat";
import ConversationCell from "./components/ConversationCell";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";
import { ChatDetailPageParams } from "./ChatDetailPage";
import { Center } from "./components/Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import { currentUserId } from "../../functions/user";

const ChatListPage = ({
  navigation
}: {
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  useUpdatePing();
  const { value: conversations, loading } = useConversations();
  if (loading || conversations == null) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }
  if (conversations.length === 0) {
    return (
      <Center>
        <Text style={{ color: "#888888" }}>No conversation yet!</Text>
      </Center>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ConversationCell
            {...item}
            onPress={() => {
              const { users, userIds } = item.doc;
              const otherUserId = userIds.filter(
                id => id !== currentUserId()
              )[0];
              const user = users[otherUserId];
              const params: ChatDetailPageParams = {
                title: user.name,
                conversationId: item.id,
                target: {
                  id: otherUserId,
                  doc: user
                }
              };
              navigation.push("chatDetail", params);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ChatListPage;
