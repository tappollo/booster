import analytics from "@react-native-firebase/analytics";
import { NavigationState, Route } from "@react-navigation/core";
import * as Sentry from "@sentry/react-native";
import { Severity } from "@sentry/react-native";

function getActiveRouteName(
  navigationState: NavigationState | undefined
): Route<string> | null {
  if (navigationState == null) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.state != null) {
    return getActiveRouteName(route.state as NavigationState);
  }
  return route;
}

export const trackScreenNavigation = (state: NavigationState | undefined) => {
  const route = getActiveRouteName(state);
  if (route) {
    analytics().setCurrentScreen(route.name);
    Sentry.addBreadcrumb({
      message: route.name,
      data: route.params,
      level: Severity.Log,
    });
  }
};
