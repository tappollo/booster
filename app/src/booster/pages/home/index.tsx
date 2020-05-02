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
import UserPage from "../user/UserPage";
import { useAppLaunchAfterLogin } from "../../functions/app";
import ChatDetailPage from "../chat/ChatDetailPage";
import ChatContactListPage from "../chat/ChatContactListPage";
import OnboardingProfile from "../onboarding/OnboardingProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Conversation, Doc } from "../../functions/types";
import ChatListPage from "../chat/ChatListPage";
import { targetUserIn } from "../../functions/chat";

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
      component={ChatListPage}
      options={{ tabBarIcon: wrapIcon(TabIconChat) }}
    />
    <HomeTab.Screen
      name="userPage"
      component={UserPage}
      options={{ tabBarIcon: wrapIcon(TabIconUser) }}
    />
  </HomeTab.Navigator>
);

export type HomeNavStackParams = {
  homeTab: undefined;
  chatDetail: Doc<Conversation>;
  chatContactList: undefined;
  editProfile: {
    edit: true;
  };
};

const HomeNavStack = createStackNavigator<HomeNavStackParams>();

const HomeNav = () => {
  return (
    <HomeNavStack.Navigator
      mode="card"
      screenOptions={{
        title: " ",
        headerBackTitle: " ",
        headerTintColor: "#585858",
        headerStyle: {
          borderBottomWidth: 0,
        },
      }}
    >
      <HomeNavStack.Screen
        name="homeTab"
        options={{ header: () => null }}
        component={HomeTabPage}
      />
      <HomeNavStack.Screen
        name="chatDetail"
        component={ChatDetailPage}
        options={({ route }) => {
          const { name: title } = targetUserIn(route.params.doc);
          return {
            title,
          };
        }}
      />
      <HomeNavStack.Screen
        name="chatContactList"
        component={ChatContactListPage}
        options={{ title: "Contacts" }}
      />
      <HomeNavStack.Screen name="editProfile" component={OnboardingProfile} />
    </HomeNavStack.Navigator>
  );
};

export type HomeModelStackParams = {
  homeNav: undefined;
  storybook: undefined;
};

const HomeModelStack = createNativeStackNavigator<HomeModelStackParams>();

const Home = () => {
  useAppLaunchAfterLogin();
  return (
    <HomeModelStack.Navigator
      initialRouteName="homeNav"
      screenOptions={{ headerShown: false }}
    >
      <HomeModelStack.Screen name="homeNav" component={HomeNav} />
      <HomeModelStack.Screen
        name="storybook"
        options={{ header: () => null }}
        component={StorybookUIRoot as any}
      />
    </HomeModelStack.Navigator>
  );
};

export default React.memo(Home);
