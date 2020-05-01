import React from "react";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./booster/pages/Routes";
import theme from "./booster/styles/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ActivityIndicator, StatusBar, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useWaitForCodePushAfterInstall } from "./booster/functions/app";
import * as Sentry from "@sentry/react-native";
import { getVersionString } from "./booster/functions/utils";

const App = () => {
  const checked = useWaitForCodePushAfterInstall();
  if (!checked) {
    return (
      <View
        css={`
          justify-content: center;
          align-items: center;
          flex: 1;
        `}
      >
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ErrorBoundary
      onError={(error, stackTrace) => {
        Sentry.withScope((scope) => {
          scope.setExtras({ stackTrace });
          Sentry.captureException(error);
        });
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <PaperProvider theme={theme}>
        <ActionSheetProvider>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </ActionSheetProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
};

export default codePush({
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
})(App);

codePush.getUpdateMetadata().then((update) => {
  if (update) {
    Sentry.setRelease(getVersionString());
  }
});
