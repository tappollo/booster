import { NavigationRoute } from "react-navigation";
import analytics from "@react-native-firebase/analytics";
import _ from "lodash";

function getActiveRouteName(navigationState: any): NavigationRoute | null {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route;
}

export const trackScreenNavigation = (prevState: any, currentState: any) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  if (currentScreen == null) {
    return;
  }

  if ((prevScreen && prevScreen.routeName) !== currentScreen.routeName) {
    analytics().setCurrentScreen(currentScreen.routeName);
    if (currentScreen.params != null) {
      analytics().logEvent(
        `${currentScreen.routeName}_screenParams`,
        _.pickBy(currentScreen.params, value => {
          return _.isNumber(value) || _.isBoolean(value) || _.isString(value);
        })
      );
    }
  }
};
