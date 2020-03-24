export * from "react-native";

declare module "react-native" {
  import {
    ViewProps,
    TextProps,
    TouchableOpacityProps,
    ImageProps
  } from "react-native";

  interface ViewProps {
    css?: string;
  }

  interface TextProps {
    css?: string;
  }

  interface TouchableOpacityProps {
    css?: string;
  }

  interface ImageProps {
    css?: string;
  }
}
