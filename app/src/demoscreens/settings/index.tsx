import React from "react";
import {
  createStackNavigator,
  NavigationScreenOptions,
  StackNavigatorConfig
} from "react-navigation";
import { colors, fonts } from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import Settings from "./Settings";
import Profile from "./Profile";
import Notifications from "./Natifications";

const Navigator = createStackNavigator(
  {
    Settings: {
      screen: Settings
    },
    Profile: {
      screen: Profile
    },
    Notifications
  },
  {
    initialRouteName: "Settings",
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
  } as StackNavigatorConfig
);

Navigator.navigationOptions = {
  title: "Settings",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-construct" size={17} color={tintColor as string} />
  )
} as NavigationScreenOptions;
export default Navigator;
