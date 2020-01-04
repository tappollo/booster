import { BigButton } from "../../components/Button";
import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { selectImage } from "../../functions/image";
import FastImage from "react-native-fast-image";

const Container = styled.ScrollView<{ marginTop: number }>`
  flex: 1;
  margin-top: ${props => props.marginTop}px;
  padding: 20px;
`;

const ImagePage = () => {
  const { top } = useSafeArea();
  const [uri, setUri] = useState<string>();
  return (
    <Container marginTop={top}>
      <BigButton
        onPress={async () => {
          try {
            setUri(await selectImage());
          } catch (e) {
            if (e != null) {
              Alert.alert(e.message);
            }
          }
        }}
      >
        Upload Image
      </BigButton>
      {uri && (
        <>
          <FastImage source={{ uri }} />
        </>
      )}
    </Container>
  );
};

export default ImagePage;
