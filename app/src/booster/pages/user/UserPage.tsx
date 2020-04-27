import styled from "styled-components/native";
import React, { useContext } from "react";
import LogoutButton from "./components/LogoutButton";
import { code, hash } from "../../../version.json";
import { Text } from "react-native";
import { useActionSheet } from "../../functions/actionsheet";
import { logout, promoteToAdmin, typedProfile } from "../../functions/user";
import useModalInput from "../../components/useModalInput";
import { AppRouteContext } from "../Routes";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 20px;
`;

export const Version = () => {
  const showActionSheet = useActionSheet();
  const { resetRoute } = useContext(AppRouteContext);
  const { getInput, element } = useModalInput({
    title: "Password",
    autoCapitalize: "none",
    placeholder: "Aa123456",
  });
  return (
    <>
      {element}
      <Text
        css={`
          text-align: center;
          color: lightgray;
        `}
        onLongPress={() => {
          showActionSheet(
            [
              {
                title: "Clear onboarding flat",
                onPress: async () => {
                  await typedProfile.update({ onboardingCompleted: 0 });
                  await logout();
                  resetRoute?.();
                },
              },
              {
                title: "Promote to admin",
                onPress: () => {
                  getInput(async (result) => {
                    await promoteToAdmin(result);
                  });
                },
              },
            ],
            { defaultCancel: true }
          );
        }}
      >
        {hash.slice(0, 7)}-{code}
      </Text>
    </>
  );
};

const UserPage = () => {
  return (
    <Container>
      <LogoutButton />
      <Version />
    </Container>
  );
};

export default UserPage;
