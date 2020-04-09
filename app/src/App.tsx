import React from "react";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./booster/pages/Routes";
import theme from "./booster/styles/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import crashlytics from "@react-native-firebase/crashlytics";

const App = () => (
  <ErrorBoundary
    onError={(error, stackTrace) => {
      crashlytics().log(stackTrace);
      crashlytics().recordError(error);
    }}
  >
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <PaperProvider theme={theme}>
      <ActionSheetProvider>
        <Routes />
      </ActionSheetProvider>
    </PaperProvider>
  </ErrorBoundary>
);

export default codePush({
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
})(App);
