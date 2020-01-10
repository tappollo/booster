import { NavigationNativeContainer } from "@react-navigation/native";
import React, { createContext, useCallback, useEffect, useState } from "react";
import OnBoarding from "./onboarding";
import Home from "./home";
import { trackScreenNavigation } from "../functions/analytics";
import auth from "@react-native-firebase/auth";

export const AppRouteContext = createContext<{ resetRoute?: () => void }>({});

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    if (isLoggedIn != null) {
      return;
    }
    return auth().onAuthStateChanged(user => {
      setIsLoggedIn(user != null);
    });
  }, [isLoggedIn]);
  const resetRoute = useCallback(() => {
    setIsLoggedIn(null);
  }, [setIsLoggedIn]);
  if (isLoggedIn == null) {
    return null;
  }
  return (
    <AppRouteContext.Provider value={{ resetRoute }}>
      <NavigationNativeContainer
        key={isLoggedIn ? "Home" : "Onboarding"}
        onStateChange={trackScreenNavigation}
      >
        {!isLoggedIn ? <Home /> : <OnBoarding />}
      </NavigationNativeContainer>
    </AppRouteContext.Provider>
  );
};

export default Routes;
