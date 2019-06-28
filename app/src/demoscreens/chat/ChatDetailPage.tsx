import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { currentUser } from "../../functions/auth";
import { markConversationAsRead, targetInChat } from "../../functions/chat";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useCollection } from "../../functions/firestore";
import {
  checkPermissionAndPickImage,
  resizeAndUpload
} from "../../functions/images";
import { firestore } from "react-native-firebase";
import {
  NavigationEvents,
  NavigationScreenComponent,
  NavigationStackScreenOptions
} from "react-navigation";
import { useDatabaseField } from "../../functions/database";
import { GiftedChat } from "react-native-gifted-chat";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DisableIQKeyboardWhenFocused from "./components/DisableIQKeyboardWhenFocused";
import { Conversation, Doc, Message, UserStatus } from "../../functions/types";

const IsTypingText = styled(Text)`
  margin: 10px;
  color: #888888;
`;

const ImageAction = (props: {
  sendMessage: (message: Message) => Promise<void>;
}) => {
  const [uploading, setUploading] = useState(false);
  return (
    <TouchableOpacity
      style={{ alignSelf: "center", paddingLeft: 10 }}
      onPress={async () => {
        try {
          const picked = await checkPermissionAndPickImage();
          if (!picked.uri) {
            return;
          }
          setUploading(true);
          const image = await resizeAndUpload(picked.uri);
          await props.sendMessage({
            image,
            text: "",
            createdAt: firestore.FieldValue.serverTimestamp() as any,
            createdBy: currentUser().uid
          });
        } catch (error) {
          if (error) {
            Alert.alert(error.message);
          }
        } finally {
          setUploading(false);
        }
      }}
      disabled={uploading}
    >
      {uploading ? (
        <ActivityIndicator />
      ) : (
        <MaterialIcons name="camera-alt" size={25} color="black" />
      )}
    </TouchableOpacity>
  );
};

const ChatDetailPage: NavigationScreenComponent<
  { conversation: Doc<Conversation> },
  NavigationStackScreenOptions
> = ({ navigation }) => {
  const conversation: Doc<Conversation> = navigation.getParam("conversation");
  const { value: myUserStatus, update: updateStatus } = useDatabaseField<
    UserStatus
  >(`userStatus/${currentUser().uid}`);
  const { value: targetUserStatus } = useDatabaseField<UserStatus>(
    `userStatus/${targetInChat(conversation.doc)}`
  );
  const messagesRef = useMemo(
    () => firestore().collection(`conversations/${conversation.id}/messages`),
    [conversation.id]
  );
  const { items: messages } = useCollection<Message>(
    messagesRef.orderBy("createdAt", "desc")
  );
  const sendMessage = useCallback(async (message: Message): Promise<void> => {
    await messagesRef.add(message);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DisableIQKeyboardWhenFocused />
      <NavigationEvents
        onDidFocus={async () => {
          await updateStatus({ conversationId: conversation.id });
          await markConversationAsRead(conversation.id);
        }}
        onWillBlur={async () => {
          await updateStatus({ conversationId: "" });
        }}
      />
      <GiftedChat
        renderFooter={() => {
          if (
            targetUserStatus &&
            targetUserStatus.online &&
            targetUserStatus.conversationId === conversation.id &&
            targetUserStatus.isTyping
          ) {
            return (
              <IsTypingText>{`${conversation.doc.userDetails[targetInChat(conversation.doc)].displayName} is typing...`}</IsTypingText>
            );
          }
          return null;
        }}
        renderActions={() => <ImageAction sendMessage={sendMessage} />}
        onInputTextChanged={async input => {
          if (myUserStatus && myUserStatus.isTyping === input.length > 0) {
            return;
          }
          await updateStatus({ isTyping: input.length > 0 }).catch(e =>
            Alert.alert(e.message)
          );
        }}
        messages={messages.map(m => ({
          _id: m.id,
          text: m.doc.text,
          image: m.doc.image,
          system: m.doc.system,
          user: {
            _id: m.doc.createdBy,
            name: conversation.doc.userDetails[m.doc.createdBy].displayName,
            avatar: conversation.doc.userDetails[m.doc.createdBy].photoURL
          },
          createdAt: m.doc.createdAt ? m.doc.createdAt.toDate() : new Date()
        }))}
        bottomOffset={getBottomSpace()}
        onSend={newMessages =>
          newMessages.forEach(async message => {
            await sendMessage({
              createdBy: currentUser().uid,
              system: false,
              image: message.image,
              text: message.text,
              createdAt: firestore.FieldValue.serverTimestamp() as any
            });
          })
        }
        user={{
          _id: currentUser().uid
        }}
      />
    </SafeAreaView>
  );
};

ChatDetailPage.navigationOptions = ({ navigation }) => {
  const conversation: Doc<Conversation> = navigation.getParam("conversation");
  const name =
    conversation.doc.userDetails[targetInChat(conversation.doc)].displayName;
  return {
    title: name || "Chat"
  };
};

export default ChatDetailPage;
