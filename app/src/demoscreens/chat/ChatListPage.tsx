import {
  NavigationScreenComponent,
  NavigationStackScreenOptions
} from "react-navigation";
import React, { useEffect } from "react";
import { requestAndUploadToken } from "../../functions/notifications";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ChatListPage: NavigationScreenComponent<
  {},
  NavigationStackScreenOptions
> = () => {
  useEffect(() => {
    requestAndUploadToken().catch();
  }, []);
  return null;
};

const BarIcon = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

ChatListPage.navigationOptions = ({ navigation }) => ({
  title: "Chat",
  headerLeft: () => (
    <BarIcon
      onPress={() => {
        navigation.push("ChatContactListPage");
      }}
    >
      <Icon name="ios-contact" color="white" size={25} />
    </BarIcon>
  )
});

export default ChatListPage;
