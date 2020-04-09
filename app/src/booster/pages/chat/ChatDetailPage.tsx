import React, { useEffect, useState } from "react";
import { Composer, GiftedChat } from "react-native-gifted-chat";
import { ActivityIndicator, Alert, Text } from "react-native";
import styled from "styled-components/native";
import { Doc, Profile } from "../../functions/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import { RouteProp } from "@react-navigation/core";
import {
  startConversation,
  updateUserStatus,
  useMessages,
  useUpdateStatus,
  useUserStatus,
} from "../../functions/chat";
import { currentUserId } from "../../functions/user";
import { thumbnailImage } from "../../functions/image";
import { Center } from "./components/Layout";
import ChatInputBar from "./components/ChatInputBar";
import {
  useKeyboardManagerOnFocus,
  useToolbarOnFocus,
} from "../../functions/utils";
import ChatImageCell from "./components/ChatImageCell";

const IsTypingText = styled(Text)`
  margin: 10px;
  color: #888888;
`;

export interface ChatDetailPageParams {
  title: string;
  conversationId?: string;
  target: Doc<Profile>;
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = ({
  chatId,
  target,
}: {
  target: Doc<Profile>;
  chatId: string;
}) => {
  useUpdateStatus(chatId);
  const { messages, send } = useMessages(chatId);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    updateUserStatus({ isTyping }).catch();
  }, [isTyping]);
  const targetUserStatus = useUserStatus(target.id);
  useToolbarOnFocus(false);
  useKeyboardManagerOnFocus(false);
  return (
    <Container>
      <GiftedChat
        minComposerHeight={46}
        minInputToolbarHeight={78}
        renderMessageImage={(props) => <ChatImageCell {...props} />}
        renderInputToolbar={(toolbar: Composer["props"]) => (
          <ChatInputBar
            send={send}
            onContentSizeChange={toolbar.onInputSizeChanged}
          />
        )}
        renderFooter={() => {
          if (!targetUserStatus.value) {
            return null;
          }
          if (targetUserStatus.value.conversationId !== chatId) {
            return null;
          }
          if (targetUserStatus.value.isTyping) {
            return (
              <IsTypingText>{`${target.doc.name} is typing...`}</IsTypingText>
            );
          }
          return null;
        }}
        onInputTextChanged={(input) => {
          setIsTyping(input.length > 0);
        }}
        messages={messages.map((m) => ({
          _id: m.id,
          text: m.doc.type !== "image" ? m.doc.content : "",
          image: m.doc.type === "image" ? m.doc.content : "",
          system: m.doc.type === "system",
          user: {
            _id: m.doc.createdBy,
            name: m.doc.user.name,
            avatar: thumbnailImage(m.doc.user.avatar, 200, 200),
          },
          createdAt: m.doc.createdAt?.toDate(),
        }))}
        user={{
          _id: currentUserId(),
        }}
      />
    </Container>
  );
};

const ChatDetailPage = ({
  route,
}: {
  route: RouteProp<HomeNavStackParams, "chatDetail">;
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  const { target, conversationId } = route.params;
  const [chatId, setChatId] = useState(conversationId);
  useEffect(() => {
    if (conversationId != null) {
      return;
    }
    startConversation(target.id)
      .then(setChatId)
      .catch((e) => Alert.alert(e.message));
  }, [conversationId, target]);
  if (chatId == null) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }
  return <Content target={target} chatId={chatId} />;
};

export default React.memo(ChatDetailPage);
