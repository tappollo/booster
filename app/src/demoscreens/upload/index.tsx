import React, { useState } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import {
  createStackNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Column, Row } from "../../components";
import { margins, colors, fonts } from "../../styles";
import { firestore } from "react-native-firebase";
import { currentUserRef } from "../../functions/auth";
import { useDocument, useCollection } from "../../functions/firestore";
import { DocumentReference } from "../../functions/types";
import { FireImageRef, ImageData } from "../../components/FireImage";
import { requirePermissions, pickImage } from "../../functions/images";
import { auth } from "react-native-firebase";
import resizer from "react-native-image-resizer";
import { useCurrentUser } from "../../functions/auth";

const { width } = Dimensions.get("window");

const upload = async () => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }
  await requirePermissions();
  const file = await pickImage();
  if (!file.uri) {
    return;
  }
  const image = await resizer.createResizedImage(
    file.uri,
    1280,
    1280,
    "JPEG",
    80
  );
  const data = new FormData();
  data.append("avatar", {
    uri: image.uri,
    name: file.fileName || "",
    type: "image/jpeg"
  });
  const token = await user.getIdToken();
  const response = await fetch(
    "https://us-central1-mercy-b94dd.cloudfunctions.net/api/avatar",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: data
    }
  );
  return response;
};

const ImageUpload: NSC<{}, NSO> = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  return (
    <Column expand scroll>
      <FireImageRef
        style={{ backgroundColor: "black", marginTop: 20 }}
        imageRef={user ? user.avatar : undefined}
        width={width}
      />
      <Row style={{ marginTop: 20 }}>
        <FireImageRef
          style={{ backgroundColor: "black" }}
          imageRef={user ? user.avatar : undefined}
          width={width / 2}
        />
        <Column style={{ marginLeft: 20 }}>
          <FireImageRef
            style={{ backgroundColor: "black" }}
            imageRef={user ? user.avatar : undefined}
            width={width / 4}
          />
          <FireImageRef
            style={{ backgroundColor: "black", marginTop: 20 }}
            imageRef={user ? user.avatar : undefined}
            width={width / 8}
          />
        </Column>
      </Row>
      <ActivityIndicator animating={loading} />
      <Button
        title="Upload"
        onPress={() => {
          setLoading(true);
          upload()
            .then(_ => {
              setLoading(false);
            })
            .catch(_ => {
              console.error("===========");
              setLoading(false);
            });
        }}
      />
    </Column>
  );
};

ImageUpload.navigationOptions = {
  title: "Upload",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor as string} />
  )
};

const Navigator = createStackNavigator(
  {
    ImageUpload
  },
  {
    initialRouteName: "ImageUpload",
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
  title: "Upload",
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor} />
  )
};

export default Navigator;
