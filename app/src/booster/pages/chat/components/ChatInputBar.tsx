import { Message } from "../../../functions/types";
import { useGetDocument } from "../../../functions/firebase/firestoreHooks";
import { currentUserId, typedProfile } from "../../../functions/user";
import firestore from "@react-native-firebase/firestore";
import styled from "styled-components/native";
import {
  LayoutAnimation,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useRef, useState } from "react";
import { usePickAndUploadImage } from "../../../functions/image";
import ImageIcon from "../assets/chatImage.svg";
import { ActivityIndicator } from "react-native-paper";

const Container = styled.View`
  background-color: white;
  padding: 15px;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: rgba(215, 215, 215, 0.5);
  flex-direction: row;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 46px;
  border-radius: 10px;
  background-color: #ededed;
`;

const ImageAction = (props: {
  onPress: () => void;
  selectedImage: (image: string) => void;
}) => {
  const { pick, isUploading } = usePickAndUploadImage();
  return (
    <TouchableOpacity
      css={`
        width: 44px;
        height: 44px;
        justify-content: center;
        align-items: center;
      `}
      style={{ alignSelf: "center", marginLeft: 10 }}
      onPress={async () => {
        props.onPress();
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
        <ImageIcon style={StyleSheet.absoluteFill} />
      )}
    </TouchableOpacity>
  );
};

const Input = styled.TextInput.attrs({
  placeholder: "Type a message...",
  multiline: true
})`
  font-size: 17px;
  flex: 1;
  padding: 12px 18px;
`;

const SendButton = (props: { onPress: () => void }) => (
  <SendButton.Container onPress={props.onPress}>
    <SendButton.Title>Send</SendButton.Title>
  </SendButton.Container>
);

SendButton.Title = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: #4b53ff;
`;

SendButton.Container = styled.TouchableOpacity`
  height: 46px;
  padding: 0 16px;
  justify-content: center;
`;

const ChatInputBar = (props: {
  onContentSizeChange?: (size: { width: number; height: number }) => void;
  send: (message: Message) => Promise<void>;
}) => {
  const { value: profile } = useGetDocument(typedProfile.ref());
  const [text, setText] = useState("");
  const input = useRef<TextInput>(null);
  const contentSize = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0
  });
  return (
    <Container>
      <Content>
        <Input
          ref={input}
          value={text}
          onContentSizeChange={(e: any) => {
            const { height, width } = e.nativeEvent.contentSize;
            if (height === 0 || width === 0) {
              return;
            }
            if (
              contentSize.current.width !== width ||
              contentSize.current.height !== height
            ) {
              contentSize.current = { width, height };
              props.onContentSizeChange?.({ width, height });
            }
          }}
          onChangeText={(newText: string) => {
            if ((newText && !text) || (text && !newText)) {
              LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.linear,
                duration: 100
              });
            }
            setText(newText);
          }}
        />
        {Boolean(text) && (
          <SendButton
            onPress={async () => {
              setText("");
              await props.send({
                content: text,
                createdAt: firestore.FieldValue.serverTimestamp() as any,
                createdBy: currentUserId(),
                type: "text",
                user: {
                  avatar: profile!.avatar,
                  name: profile!.name
                }
              });
            }}
          />
        )}
      </Content>
      {!text && (
        <ImageAction
          onPress={() => {
            input.current?.blur();
          }}
          selectedImage={async image => {
            await props.send({
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
    </Container>
  );
};

export default ChatInputBar;
