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
import styled from "styled-components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Doc, Message, Profile } from "../../functions/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import { RouteProp } from "@react-navigation/core";

const IsTypingText = styled(Text)`
  margin: 10px;
  color: #888888;
`;

export interface ChatDetailPageParams {
  title: string;
  conversationId?: string;
  target: Doc<Profile>;
}

const ImageAction = (props: { sendMessage: (message: Message) => void }) => {
  const [uploading, setUploading] = useState(false);
  return (
    <TouchableOpacity
      style={{ alignSelf: "center", paddingLeft: 10 }}
      onPress={async () => {
        try {
          // const picked = await checkPermissionAndPickImage();
          // setUploading(true);
          // const image = await resizeAndUpload(picked);
          // await props.sendMessage({
          //   content: image,
          //   type: "image",
          //   createdAt: firestore.FieldValue.serverTimestamp() as any,
          //   createdBy: currentUserId(),
          //   user: {
          //     avatar: currentUser().photoURL || "",
          //     name: currentUser().displayName || ""
          //   }
          // });
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

const ChatDetailPage = ({
  route,
  navigation
}: {
  route: RouteProp<HomeNavStackParams, "chatDetail">;
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  return null;
  // const target = navigation.getParam("target");
  // const conversationId = navigation.getParam("conversationId");
  // const { messages, send } = useMessages(target.id, conversationId);
  // useEffect(() => {
  //   if (conversationId) {
  //     updateUserStatus({ conversationId }).catch();
  //     markConversationAsRead(conversationId).catch();
  //     return () => {
  //       markConversationAsRead(conversationId).catch();
  //       removeCurrentConversationID().catch();
  //     };
  //   }
  // }, [conversationId]);
  // const [isTyping, setIsTyping] = useState(false);
  // useEffect(() => {
  //   updateUserStatus({ isTyping }).catch();
  // }, [isTyping]);
  // const targetUserStatus = useUserStatus(target.id);
  // return (
  //   <>
  //     <FixIQKeyboardManager />
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <GiftedChat
  //         renderFooter={() => {
  //           if (!targetUserStatus.value) {
  //             return null;
  //           }
  //           if (targetUserStatus.value.conversationId !== conversationId) {
  //             return null;
  //           }
  //           if (targetUserStatus.value.isTyping) {
  //             return (
  //               <IsTypingText>{`${target.doc.name} is typing...`}</IsTypingText>
  //             );
  //           }
  //           return null;
  //         }}
  //         onInputTextChanged={input => {
  //           setIsTyping(input.length > 0);
  //         }}
  //         messages={messages.map(m => ({
  //           _id: m.id,
  //           text: m.doc.type !== "image" ? m.doc.content : "",
  //           image: m.doc.type === "image" ? m.doc.content : "",
  //           system: m.doc.type === "system",
  //           user: {
  //             _id: m.doc.createdBy,
  //             name: m.doc.user.name,
  //             avatar: m.doc.user.avatar
  //           },
  //           createdAt: m.doc.createdAt
  //         }))}
  //         renderActions={() => <ImageAction sendMessage={send} />}
  //         bottomOffset={getBottomSpace()}
  //         onSend={newMessages =>
  //           newMessages.forEach(async message => {
  //             await send({
  //               content: message.text,
  //               createdAt: firestore.FieldValue.serverTimestamp() as any,
  //               createdBy: currentUserId(),
  //               type: "text",
  //               user: {
  //                 avatar: currentUser().photoURL || "",
  //                 name: currentUser().displayName || ""
  //               }
  //             });
  //           })
  //         }
  //         user={{
  //           _id: currentUserId()
  //         }}
  //       />
  //     </SafeAreaView>
  //   </>
  // );
};

export default React.memo(ChatDetailPage);
