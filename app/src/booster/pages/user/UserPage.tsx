import styled from "styled-components/native";
import React from "react";
import LogoutButton from "./components/LogoutButton";
import Version from "./components/Version";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 20px;
`;

const UserPage = () => {
  return (
    <Container>
      <LogoutButton />
      <Version />
    </Container>
  );
};

export default UserPage;
