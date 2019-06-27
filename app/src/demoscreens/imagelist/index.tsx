import React from "react";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Column, Row } from "../../components/Container";
import { colors, fonts } from "../../styles";
import { firestore } from "react-native-firebase";
import styled from "styled-components/native";
import { useCollection } from "../../functions/firestore";
import { CollectionReference, DocumentReference } from "../../functions/types";
import { FireImageRef } from "../../components/FireImage";
import { useRadioButtons } from "../../components/RadioButton";
import { useShrinkHeader } from "../../components/NavHeader";
import Upload from "../upload";

const { width } = Dimensions.get("window");

interface ImageData {
  base64: string;
  width: number;
  height: number;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  original: string;
}

const store = firestore();

const Title = styled(Animated.Text)`
  font: 500 17px System;
  color: ${colors.white};
  position: absolute;
  top: 56;
  left: 0;
  right: 0;
  text-align: center;
`;
const Segments = styled(Row)`
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  justify-content: space-evenly;
`;

const UploadButton = (props: { onPress: () => void }) => (
  <UploadButton.Container onPress={props.onPress}>
    <Icon name="ios-cloud-upload" color="white" size={25} />
  </UploadButton.Container>
);

UploadButton.Container = styled(TouchableOpacity)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: blue;
  justify-content: center;
  align-items: center;
`;

const ImageList: NSC<{}, NSO> = ({ navigation }) => {
  const ref = store.collection("testList") as CollectionReference<{
    image: DocumentReference<ImageData>;
  }>;
  const [items] = useCollection(ref);
  const [Header, scrollHook, getHeight] = useShrinkHeader();
  const [currentLabel, buttons] = useRadioButtons([
    "Label One",
    "Label Two",
    "Label Three"
  ]);
  return (
    <Column expand>
      <Animated.FlatList
        data={items}
        renderItem={({ item }: any) => (
          <FireImageRef
            style={{
              backgroundColor: "black",
              marginTop: 8,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 3
            }}
            width={width}
            imageRef={item.image}
          />
        )}
        keyExtractor={(_: any, index: any) => `${index}`}
        style={{ marginTop: getHeight() }}
        scrollEventThrottle={16}
        onScroll={scrollHook}
      />
      <Header>
        <Title style={{ opacity: getHeight([1, 0]) }}>Booster</Title>
        <Segments>{buttons}</Segments>
      </Header>
      <UploadButton
        onPress={() => {
          navigation.push("Upload");
        }}
      />
    </Column>
  );
};

ImageList.navigationOptions = {
  header: null,
  title: "Images",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor as string} />
  )
};

const Navigator = createStackNavigator(
  {
    ImageList,
    Upload
  },
  {
    initialRouteName: "ImageList",
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        height: 45,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
        elevation: 0
      },
      headerTitleStyle: {
        ...fonts.heading3,
        color: colors.white
      }
    }
  }
);

Navigator.navigationOptions = {
  title: "Images",
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor} />
  )
};

export default Navigator;
