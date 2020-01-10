import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import styled from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Doc, Profile } from "../../functions/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import { RouteProp } from "@react-navigation/core";
import {
  startConversation,
  updateUserStatus,
  useMessages,
  useUpdateStatus,
  useUserStatus
} from "../../functions/chat";
import { currentUserId, profileRef } from "../../functions/user";
import { useGetDocument } from "../../functions/firebase/firestore";
import { usePickAndUploadImage } from "../../functions/image";
import { Center } from "./components/Layout";

const IsTypingText = styled(Text)`
  margin: 10px;
  color: #888888;
`;

export interface ChatDetailPageParams {
  title: string;
  conversationId?: string;
  target: Doc<Profile>;
}

const ImageAction = (props: { selectedImage: (image: string) => void }) => {
  const { pick, isUploading } = usePickAndUploadImage();
  return (
    <TouchableOpacity
      style={{ alignSelf: "center", paddingLeft: 10 }}
      onPress={async () => {
        const image = await pick();
        if (image != null) {
          await props.selectedImage(image);
        }
      }}
      disabled={isUploading}
    >
      {isUploading ? (
        <ActivityIndicator />
      ) : (
        <MaterialIcons name="camera-alt" size={25} color="black" />
      )}
    </TouchableOpacity>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = ({
  chatId,
  target
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
  const { value: profile } = useGetDocument(profileRef());
  const targetUserStatus = useUserStatus(target.id);
  return (
    <Container>
      <GiftedChat
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
        onInputTextChanged={input => {
          setIsTyping(input.length > 0);
        }}
        messages={messages.map(m => ({
          _id: m.id,
          text: m.doc.type !== "image" ? m.doc.content : "",
          image: m.doc.type === "image" ? m.doc.content : "",
          system: m.doc.type === "system",
          user: {
            _id: m.doc.createdBy,
            name: m.doc.user.name,
            avatar: m.doc.user.avatar
          },
          createdAt: m.doc.createdAt?.toDate()
        }))}
        renderActions={() => (
          <ImageAction
            selectedImage={async (image: string) => {
              await send({
                content: image,
                createdAt: firestore.FieldValue.serverTimestamp() as any,
                createdBy: currentUserId(),
                type: "image",
                user: {
                  avatar: profile!.avatar,
                  name: profile!.name
                }
              });
            }}
          />
        )}
        bottomOffset={getBottomSpace()}
        onSend={newMessages =>
          newMessages.forEach(async message => {
            await send({
              content: message.text,
              createdAt: firestore.FieldValue.serverTimestamp() as any,
              createdBy: currentUserId(),
              type: "text",
              user: {
                avatar: profile!.avatar,
                name: profile!.name
              }
            });
          })
        }
        user={{
          _id: currentUserId()
        }}
      />
    </Container>
  );
};

const ChatDetailPage = ({
  route
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
      .catch(e => Alert.alert(e.message));
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
