import { PageContainer } from "../../components/Page";
import { BigButton } from "../../components/Button";
import { auth } from "react-native-firebase";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import React from "react";

const HomePage: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <PageContainer>
      <BigButton
        onPress={async () => {
          await auth().signOut();
          navigation.navigate("Dispatcher");
        }}
      >
        Logout
      </BigButton>
    </PageContainer>
  );
};

export default HomePage;
