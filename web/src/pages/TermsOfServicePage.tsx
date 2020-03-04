import React from "react";
import ContentPage from "./ContentPage";
// @ts-ignore
import raw from "raw.macro";

const TermsOfServicePage = () => (
  <ContentPage source={raw("./TermsOfService.md")} />
);

export default TermsOfServicePage;
