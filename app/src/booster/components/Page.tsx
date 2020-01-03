import styled from "styled-components";
import { View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const PageContainer = styled(View)`
  flex: 1;
  padding: 24px 24px ${getBottomSpace()}px;
`;
