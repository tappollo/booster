import { Paragraph, Title } from "react-native-paper";
import styled from "styled-components";
import theme from "../styles/theme";

export const BigTitle = styled(Title)`
  color: #1f1f1f;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 21px;
`;

export const Subtitle = styled(Paragraph)`
  color: ${theme.colors.backdrop};
  margin-top: -10px;
  margin-bottom: 20px;
`;
