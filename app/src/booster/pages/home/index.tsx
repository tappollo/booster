import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage";
import StorybookUIRoot from "../../../../storybook";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIconHome from "./assets/tabIconHome.svg";
import TabIconImage from "./assets/tabIconImage.svg";
import TabIconChat from "./assets/tabIconChat.svg";
import TabIconUser from "./assets/tabIconUser.svg";
import { SvgProps } from "react-native-svg";
import ImagePage from "../image/ImagePage";
import ChatPage from "../chat/ChatPage";
import UserPage from "../user/UserPage";

type BottomTabParams = {
  homePage: undefined;
  imagePage: undefined;
  chatPage: undefined;
  userPage: undefined;
};

const wrapIcon = (IconComponent: React.FC<SvgProps>) => (props: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return <IconComponent fill={props.color} />;
};

const HomeTab = createBottomTabNavigator<BottomTabParams>();

const HomeTabPage = () => (
  <HomeTab.Navigator tabBarOptions={{ showLabel: false }}>
    <HomeTab.Screen
      name="homePage"
      component={HomePage}
      options={{ tabBarIcon: wrapIcon(TabIconHome) }}
    />
    <HomeTab.Screen
      name="imagePage"
      component={ImagePage}
      options={{ tabBarIcon: wrapIcon(TabIconImage) }}
    />
    <HomeTab.Screen
      name="chatPage"
      component={ChatPage}
      options={{ tabBarIcon: wrapIcon(TabIconChat) }}
    />
    <HomeTab.Screen
      name="userPage"
      component={UserPage}
      options={{ tabBarIcon: wrapIcon(TabIconUser) }}
    />
  </HomeTab.Navigator>
);

const HomeNavStack = createStackNavigator();
const HomeNav = () => {
  return (
    <HomeNavStack.Navigator mode="card">
      <HomeNavStack.Screen
        name="homeTab"
        options={{ header: () => null }}
        component={HomeTabPage}
      />
    </HomeNavStack.Navigator>
  );
};

export type HomeModelStackParams = {
  homeNav: undefined;
  storybook: undefined;
};

const HomeModelStack = createStackNavigator<HomeModelStackParams>();

const Home = () => {
  return (
    <HomeModelStack.Navigator initialRouteName="homeNav" mode="modal">
      <HomeModelStack.Screen
        name="homeNav"
        component={HomeNav}
        options={{ header: () => null }}
      />
      <HomeModelStack.Screen
        name="storybook"
        options={{ header: () => null }}
        component={StorybookUIRoot as any}
      />
    </HomeModelStack.Navigator>
  );
};

export default React.memo(Home);
