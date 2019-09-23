import { BigButton } from "../../components/Button";
import styled from "styled-components";
import { View } from "react-native";
import React from "react";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const LandingPage = () => {
  return (
    <Container>
      <BigButton>Hello World</BigButton>
    </Container>
  );
};

export default LandingPage;
