import { createContext } from "react";

export const AppRouteContext = createContext<{
  resetRoute?: () => void;
  isLoggedIn: "landing" | "signUp" | "home";
}>({ isLoggedIn: "landing" });
