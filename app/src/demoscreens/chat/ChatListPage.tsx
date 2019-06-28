import {
  NavigationScreenComponent,
  NavigationStackScreenOptions
} from "react-navigation";
import React, { useEffect } from "react";
import { requestAndUploadToken } from "../../functions/notifications";
import styled from "styled-components";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useConversations, useUpdatePing } from "../../functions/chat";
import { Center } from "../../components";
import ConversationCell from "./components/ConversationCell";

const ChatListPage: NavigationScreenComponent<
  {},
  NavigationStackScreenOptions
> = ({ navigation }) => {
  useEffect(() => {
    requestAndUploadToken().catch();
  }, []);
  useUpdatePing();
  const { items: conversations, loading } = useConversations();
  if (loading) {
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
              navigation.push("ChatDetailPage", {
                conversation: item
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const BarIcon = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

ChatListPage.navigationOptions = ({ navigation }) => ({
  title: "Chat",
  headerLeft: () => (
    <BarIcon
      onPress={() => {
        navigation.push("ChatContactListPage");
      }}
    >
      <Icon name="ios-contact" color="white" size={25} />
    </BarIcon>
  )
});

export default ChatListPage;
