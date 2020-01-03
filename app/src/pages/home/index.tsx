import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage";
import StorybookUIRoot from "../../../storybook";
import React from "react";

const HomeNavStack = createStackNavigator();

const HomeNav = () => {
  return (
    <HomeNavStack.Navigator mode="card">
      <HomeNavStack.Screen name="home" component={HomePage} />
    </HomeNavStack.Navigator>
  );
};

const HomeModelStack = createStackNavigator();
const Home = () => {
  return (
    <HomeModelStack.Navigator initialRouteName="homeNav" mode="modal">
      <HomeModelStack.Screen
        name="homeNav"
        component={HomeNav}
        options={{ header: () => null }}
      />
      <HomeModelStack.Screen
        name="Storybook"
        options={{ header: () => null }}
        component={() => <StorybookUIRoot />}
      />
    </HomeModelStack.Navigator>
  );
};

export default React.memo(Home);
