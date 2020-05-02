import styled from "styled-components";
import { FlatList, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import { Profile } from "../../functions/types";
import {
  startConversation,
  typedConversation,
  useNewContacts,
} from "../../functions/chat";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";
import LoadingErrorStateView from "../../components/LoadingErrorStateView";
import { thumbnailImage } from "../../functions/image";
import FastImage from "react-native-fast-image";

const Cell = (props: Profile & { onPress: () => void }) => {
  return (
    <Cell.Container onPress={props.onPress}>
      <Cell.Avatar source={{ uri: thumbnailImage(props.avatar, 200, 200) }} />
      <Cell.Title>{props.name}</Cell.Title>
    </Cell.Container>
  );
};

Cell.Avatar = styled(FastImage)`
  background: #d8d8d8;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

Cell.Title = styled(Text)`
  font-size: 18px;
  color: #070707;
  font-weight: 600;
`;

Cell.Container = styled(TouchableOpacity)`
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  margin: 15px;
  height: 60px;
  padding: 10px;
  align-items: center;
`;

const ChatContactListPage = ({
  navigation,
}: {
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  const contactsState = useNewContacts();
  return (
    <LoadingErrorStateView
      state={contactsState}
      isEmpty={(value) => value.length === 0}
      emptyText="There is no new contacts"
    >
      {(contacts) => (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Cell
              {...item.doc}
              onPress={async () => {
                const id =
                  item.conversationId ?? (await startConversation(item.id));
                const conversation = await typedConversation(id).read();
                navigation.push("chatDetail", {
                  id,
                  doc: conversation,
                });
              }}
            />
          )}
        />
      )}
    </LoadingErrorStateView>
  );
};

export default ChatContactListPage;
