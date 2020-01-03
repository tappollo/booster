import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage";
import StorybookUIRoot from "../../../storybook";
import React from "react";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="Storybook"
        options={{ header: () => null }}
        component={() => <StorybookUIRoot />}
      />
    </Stack.Navigator>
  );
};

export default React.memo(Home);
