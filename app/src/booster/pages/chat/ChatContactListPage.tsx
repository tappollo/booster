import { NavigationScreenComponent } from "react-navigation";
import { useNewContacts, useConversations } from "./chat";
import { User } from "./model";
import styled from "styled-components";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import * as React from "react";
import { Center } from "../components/Utils";
import { ChatDetailPageParams } from "./ChatDetailPage";
import Ionicons from "react-native-vector-icons/Ionicons";

const Cell = (props: User & { onPress: () => void }) => {
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

const ChatContactListPage: NavigationScreenComponent = ({ navigation }) => {
  const { items: contact, loading } = useNewContacts();
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
            navigation.push("ChatDetailPage", params);
          }}
        />
      )}
    />
  );
};

ChatContactListPage.navigationOptions = {
  title: "Contacts",
  tabBarIcon: ({ focused, tintColor }: any) => (
    <Ionicons name="ios-contact" color={tintColor || "gray"} size={25} />
  )
};

export default ChatContactListPage;
