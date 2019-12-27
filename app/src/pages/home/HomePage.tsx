import { PageContainer } from "../../components/Page";
import { BigButton } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import React from "react";

const HomePage = () => {
  return (
    <PageContainer>
      <BigButton
        onPress={async () => {
          await auth().signOut();
        }}
      >
        Logout
      </BigButton>
    </PageContainer>
  );
};

export default HomePage;
