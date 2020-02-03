import styled from "styled-components/native";
import React from "react";
import LogoutButton from "./components/LogoutButton";
import { code, hash } from "../../../version.json";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 20px;
`;

const Version = styled.Text`
  text-align: center;
  color: lightgray;
`;

const UserPage = () => {
  return (
    <Container>
      <LogoutButton />
      <Version>
        {hash.slice(0, 7)}-{code}
      </Version>
    </Container>
  );
};

export default UserPage;
