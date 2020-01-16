import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Route exact={true} path="/" component={LandingPage} />
      <Route path="/terms_of_service" component={TermsOfServicePage} />
      <Route path="/privacy_policy" component={PrivacyPolicyPage} />
    </Router>
  );
};

export default App;
