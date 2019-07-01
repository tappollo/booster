import {
  NavigationScreenComponent,
  NavigationStackScreenOptions
} from "react-navigation";
import styled from "styled-components";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import * as React from "react";
import { UserInfo } from "../../functions/auth";
import FastImage from "react-native-fast-image";
import { useNewContacts } from "../../functions/chat";
import { functions } from "react-native-firebase";
import RNProgressHud from "react-native-progress-display";
import { Center } from "../../components";

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
  text-align: center;
  align-self: center;
  padding: 0 20px;
  color: gray;
`;

const ChatContactListPage: NavigationScreenComponent<
  {},
  NavigationStackScreenOptions
> = ({ navigation }) => {
  const { items: contact, loading, error } = useNewContacts();
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
        <EmptyText>There is no contacts</EmptyText>
      </Center>
    );
  }
  if (error != null) {
    return (
      <Center>
        <EmptyText>{error.message}</EmptyText>
      </Center>
    );
  }

  return (
    <FlatList
      data={contact}
      keyExtractor={item => item.user.id}
      renderItem={({ item }) => (
        <Cell
          {...item.user.doc}
          onPress={async () => {
            if (item.conversation == null) {
              try {
                RNProgressHud.showWithStatus("Creating...");
                const conversation = (await functions().httpsCallable(
                  "chat-newChat"
                )({
                  target: item.user.id
                })).data;
                RNProgressHud.dismiss();
                navigation.push("ChatDetailPage", {
                  conversation
                });
              } catch (e) {
                RNProgressHud.dismiss();
                Alert.alert(e.message);
              }
            } else {
              navigation.push("ChatDetailPage", {
                conversation: item.conversation
              });
            }
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
