import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import * as React from "react";
import { colors, fonts } from "../../styles";
import ChatDetailPage from "./ChatDetailPage";
import ChatContactListPage from "./ChatContactListPage";
import ChatListPage from "./ChatListPage";

const Navigator = createStackNavigator(
  {
    ChatListPage,
    ChatDetailPage,
    ChatContactListPage
  },
  {
    initialRouteName: "ChatListPage",
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        height: 45,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
        elevation: 0
      },
      headerTitleStyle: {
        ...fonts.heading3,
        color: colors.white
      }
    }
  }
);

Navigator.navigationOptions = {
  title: "Chat",
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Icon name="ios-chatbubbles" size={17} color={tintColor} />
  )
};
export default Navigator;
