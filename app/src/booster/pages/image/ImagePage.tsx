import { BigButton } from "../../components/Button";
import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { selectImage, thumbnailImage } from "../../functions/image";
import FastImage from "react-native-fast-image";
import { uploadFile } from "../../functions/firebase/storage";

const Container = styled.ScrollView<{ marginTop: number }>`
  flex: 1;
  margin-top: ${props => props.marginTop}px;
`;

const Content = styled.View`
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 13px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DemoImage = styled(FastImage)`
  width: 100%;
  aspect-ratio: 1;
  background-color: gray;
  border-radius: 15px;
`;

const ImagePage = () => {
  const { top } = useSafeArea();
  const [path, setPath] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [uri, setUri] = useState<string>();
  return (
    <Container marginTop={top}>
      <Content>
        <BigButton
          loading={uploading}
          onPress={async () => {
            try {
              setUploading(true);
              setPath(undefined);
              setUri(undefined);
              const selectedImage = await selectImage();
              setPath(selectedImage);
              const remoteUri = await uploadFile(selectedImage);
              setUri(remoteUri);
              setUploading(false);
            } catch (e) {
              setUploading(false);
              if (e != null) {
                Alert.alert(e.message);
              }
            }
          }}
        >
          Upload Image
        </BigButton>
        {path && (
          <>
            <Label>Selected local image</Label>
            <DemoImage source={{ uri: path }} />
          </>
        )}
        {uri && (
          <>
            <Label>Remote Image at 100x100</Label>
            <DemoImage
              source={{ uri: thumbnailImage(uri, 100, 100) }}
              style={{ width: 100 }}
            />
            <Label>Remote Image at 500x500</Label>
            <DemoImage source={{ uri: thumbnailImage(uri, 500, 500) }} />
          </>
        )}
      </Content>
    </Container>
  );
};

export default ImagePage;
