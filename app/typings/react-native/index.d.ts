export * from "react-native";

declare module "react-native" {
  import { CSSProp } from "styled-components";

  interface ViewProps {
    css?: CSSProp;
  }

  interface TextProps {
    css?: CSSProp;
  }

  interface TouchableOpacityProps {
    css?: CSSProp;
  }

  interface ImageProps {
    css?: CSSProp;
  }
}
