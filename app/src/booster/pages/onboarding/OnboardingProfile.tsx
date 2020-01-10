import { PageContainer } from "../../components/Page";
import { BigTitle } from "../../components/Title";
import { BigButton } from "../../components/Button";
import React, { useState } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

const AvatarButton = styled.TouchableOpacity`
  margin-top: 20px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  background-color: #cccccc;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(211, 211, 211, 0.5);
`;

const Avatar = styled(FastImage)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const OnboardingProfile = () => {
  const [loading, setLoading] = useState(false);
  return (
    <PageContainer>
      <BigTitle>Choose your{"\n"}name and avatar</BigTitle>
      <AvatarButton>
        <Avatar
          source={{
            uri:
              "https://images.unsplash.com/photo-1578432132369-36039052d387?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
          }}
        />
      </AvatarButton>
      <BigButton loading={loading} onPress={async () => {}}>
        Save Profile
      </BigButton>
    </PageContainer>
  );
};

export default OnboardingProfile;
