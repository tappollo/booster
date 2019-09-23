import { BigButton } from "../../components/Button";
import styled from "styled-components";
import { SafeAreaView } from "react-native";
import React from "react";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationStackOptions } from "react-navigation-stack";

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const LandingPage: NavigationScreenComponent<
  {},
  NavigationStackOptions
> = () => {
  return (
    <Container>
      <BigButton>Get Started</BigButton>
    </Container>
  );
};

LandingPage.navigationOptions = {
  header: null
};

export default LandingPage;
