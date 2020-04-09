import analytics from "@react-native-firebase/analytics";
import _ from "lodash";
import { NavigationState, Route } from "@react-navigation/core";

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
    analytics().logEvent(
      `${route.name}_screenParams`,
      _.pickBy(route.params, (value) => {
        return _.isNumber(value) || _.isBoolean(value) || _.isString(value);
      }) as any
    );
  }
};
