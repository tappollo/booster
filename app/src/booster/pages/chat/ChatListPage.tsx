import * as React from "react";
import { useConversations } from "../../functions/chat";
import ConversationCell from "./components/ConversationCell";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { ChatDetailPageParams } from "./ChatDetailPage";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import { currentUserId } from "../../functions/user";
import LoadingErrorStateView from "../../components/LoadingErrorStateView";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import SearchIcon from "./assets/search.svg";

const Header = styled.View`
  margin-top: ${getStatusBarHeight(true)}px;
  height: 44px;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: #000000;
  letter-spacing: 0.1px;
`;

const ChatListPage = ({
  navigation
}: {
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  const conversationsState = useConversations();
  return (
    <>
      <Header>
        <Title>Messages</Title>
        <TouchableOpacity
          onPress={() => {
            navigation.push("chatContactList");
          }}
        >
          <SearchIcon />
        </TouchableOpacity>
      </Header>
      <LoadingErrorStateView
        state={conversationsState}
        isEmpty={value => value.length === 0}
        emptyText="No conversation available"
      >
        {conversations => (
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
        )}
      </LoadingErrorStateView>
    </>
  );
};

export default ChatListPage;
