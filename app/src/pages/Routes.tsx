import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Dispatcher from "./Dispatcher";
import { createStackNavigator } from "react-navigation-stack";
import LandingPage from "./onboarding/LandingPage";
import HomePage from "./home/HomePage";
import ContinueWithPhonePage from "./onboarding/ContinueWithPhonePage";
import VerifySMSCodePage from "./onboarding/VerifySMSCodePage";
import { Platform } from "react-native";
import SelectCountryPage from "./onboarding/SelectCountryPage";

// const OnboardingNav = createStackNavigator(
//   {
//     LandingPage,
//     ContinueWithPhonePage,
//     VerifySMSCodePage
//   },
//   {
//     initialRouteName: "LandingPage",
//     // initialRouteName: "ContinueWithPhonePage",
//     defaultNavigationOptions: {
//       headerBackTitle: null,
//       headerTintColor: "#585858",
//       headerStyle: {
//         borderBottomWidth: 0
//       },
//       headerLeftContainerStyle: {
//         marginLeft: Platform.select({
//           ios: 20,
//           default: 5
//         })
//       }
//     }
//   }
// );
//
// const Onboarding = createStackNavigator(
//   {
//     OnboardingNav,
//     SelectCountryPage
//   },
//   {
//     mode: "modal",
//     headerMode: "none"
//   }
// );
//
// const Home = createStackNavigator({
//   HomePage
// });
//
// const Root = createSwitchNavigator(
//   {
//     Dispatcher,
//     Onboarding,
//     Home
//   },
//   {
//     initialRouteName: "Dispatcher"
//   }
// );
//
// export default createAppContainer(Root);

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator mode="modal" initialRouteName={init}>
        <Stack.Screen
          name="Storybook"
          component={StorybookUIRoot as any}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen name="Playground" component={PlaygroundPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerPage}
          options={{
            header: () => null,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Zink"
          component={ZinkPage}
          options={{
            header: () => null,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default Routes;
