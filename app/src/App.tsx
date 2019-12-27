import React from "react";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./pages/Routes";
import theme from "./styles/theme";
import { trackScreenNavigation } from "./functions/analytics";

const App = () => (
  <PaperProvider theme={theme}>
    <Routes onNavigationStateChange={trackScreenNavigation} />
  </PaperProvider>
);

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
})(App);
