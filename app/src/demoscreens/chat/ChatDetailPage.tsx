import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { UserInfo } from "../../functions/auth";
import { Doc, Message } from "../../functions/chat";

const Container = styled(View)``;

export interface ChatDetailPageParams {
  title: string;
  conversationId?: string;
  target: Doc<UserInfo>;
}

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
          if (!picked) {
            return;
          }
          setUploading(true);
          const image = await resizeAndUpload(picked);
          await props.sendMessage({
            image,
            text: "",
            createdAt: firestore.FieldValue.serverTimestamp() as any,
            createdBy: currentUser().uid
          });
        } catch (error) {
          if (error) {
            fullScreenAlert(error.message);
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
const ChatDetailPage = () => {
  return <Container />;
};

export default ChatDetailPage;
