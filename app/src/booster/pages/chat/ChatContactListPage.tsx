import styled from "styled-components";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import * as React from "react";
import { ChatDetailPageParams } from "./ChatDetailPage";
import { Profile } from "../../functions/types";
import { useNewContacts } from "../../functions/chat";
import { Center } from "./components/Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavStackParams } from "../home";

const Cell = (props: Profile & { onPress: () => void }) => {
  return (
    <Cell.Container onPress={props.onPress}>
      <Cell.Avatar source={{ uri: props.avatar }} />
      <Cell.Title>{props.name}</Cell.Title>
    </Cell.Container>
  );
};

Cell.Avatar = styled(Image)`
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
  margin: 5px;
  height: 50px;
  padding: 10px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  align-self: center;
  color: gray;
`;

const ChatContactListPage = ({
  navigation
}: {
  navigation: StackNavigationProp<HomeNavStackParams>;
}) => {
  const { value: contact = [], loading } = useNewContacts();
  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }
  if (contact.length === 0) {
    return (
      <Center>
        <EmptyText>There is no new contacts</EmptyText>
      </Center>
    );
  }

  return (
    <FlatList
      data={contact}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Cell
          {...item.doc}
          onPress={() => {
            const params: ChatDetailPageParams = {
              title: item.doc.name,
              conversationId: item.conversationId,
              target: item
            };
            navigation.push("chatDetail", params);
          }}
        />
      )}
    />
  );
};

export default ChatContactListPage;
