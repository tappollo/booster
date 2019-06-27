import {
  NavigationScreenComponent,
  NavigationStackScreenOptions
} from "react-navigation";
import styled from "styled-components";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as React from "react";
import { UserInfo } from "../../functions/auth";
import FastImage from "react-native-fast-image";
import { useNewContacts } from "../../functions/chat";
import { ChatDetailPageParams } from "./ChatDetailPage";

const Cell = (props: UserInfo & { onPress: () => void }) => {
  return (
    <Cell.Container onPress={props.onPress}>
      <Cell.Avatar source={{ uri: props.photoURL }} />
      <Cell.Title>{props.displayName}</Cell.Title>
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
  margin: 5px;
  height: 50px;
  padding: 10px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  align-self: center;
  color: gray;
`;

const Center = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ChatContactListPage: NavigationScreenComponent<
  {},
  NavigationStackScreenOptions
> = ({ navigation }) => {
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
              title: item.doc.displayName || "Chat",
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
  title: "Contacts"
};

export default ChatContactListPage;
