import React, { useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import {
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Column, Row } from "../../components";
import { auth } from "react-native-firebase";
import { useCurrentUserProfile } from "../../functions/auth";
import { FireImageRef } from "../../components/FireImage";
import { pickImage, requirePermissions } from "../../functions/images";
import resizer from "react-native-image-resizer";

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
  return await fetch(
    "https://us-central1-mercy-b94dd.cloudfunctions.net/api/avatar",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: data
    }
  );
};

const ImageUpload: NSC<{}, NSO> = () => {
  const user = useCurrentUserProfile();
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
            .then(() => {
              setLoading(false);
            })
            .catch(() => {
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

export default ImageUpload;
