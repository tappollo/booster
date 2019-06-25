import { createStackNavigator } from "react-navigation";
import OnBoarding from "./OnBoarding";
import Login from "./Login";
import Phone from "./Phone";
import SignUp from "./SignUp";

const Navigator = createStackNavigator(
  {
    OnBoarding: {
      screen: OnBoarding
    },
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    Phone: {
      screen: Phone
    }
  },
  {
    initialRouteName: "OnBoarding",
    mode: "modal",
    headerMode: "none"
  }
);

export default Navigator;
