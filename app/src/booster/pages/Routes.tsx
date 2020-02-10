import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useCallback, useEffect, useState } from "react";
import OnBoarding from "./onboarding";
import Home from "./home";
import { trackScreenNavigation } from "../functions/analytics";
import auth from "@react-native-firebase/auth";
import { userFinishedSignUp } from "../functions/user";

export const AppRouteContext = createContext<{
  resetRoute?: () => void;
  isLoggedIn: "landing" | "signUp" | "home";
}>({ isLoggedIn: "landing" });

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<
    "landing" | "signUp" | "home" | null
  >(null);
  useEffect(() => {
    if (isLoggedIn != null) {
      return;
    }
    return auth().onAuthStateChanged(user => {
      if (user == null) {
        setIsLoggedIn("landing");
        return;
      }
      userFinishedSignUp()
        .then(finished => {
          setIsLoggedIn(finished ? "home" : "signUp");
        })
        .catch(e => {
          console.error(e);
          setIsLoggedIn("home");
        });
    });
  }, [isLoggedIn]);
  const resetRoute = useCallback(() => {
    setIsLoggedIn(null);
  }, [setIsLoggedIn]);
  if (isLoggedIn == null) {
    return null;
  }
  return (
    <AppRouteContext.Provider value={{ resetRoute, isLoggedIn }}>
      <NavigationContainer
        key={isLoggedIn}
        onStateChange={trackScreenNavigation}
      >
        {isLoggedIn === "home" ? <Home /> : <OnBoarding />}
      </NavigationContainer>
    </AppRouteContext.Provider>
  );
};

export default Routes;
