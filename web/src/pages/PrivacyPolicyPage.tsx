import React from "react";
import ContentPage from "./ContentPage";
// @ts-ignore
import raw from "raw.macro";

const PrivacyPolicyPage = () => (
  <ContentPage source={raw("./PrivacyPolicy.md")} />
);

export default PrivacyPolicyPage;
