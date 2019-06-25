import React, { useEffect, useState, FunctionComponent as SFC } from "react";
import {
  View,
  ViewProps,
  Image,
  StyleSheet,
  PixelRatio,
  Animated,
  ActivityIndicator
} from "react-native";
import { DocumentReference } from "../functions/types";
import { useDocument } from "../functions/firestore";
export interface ImageData {
  base64: string;
  width: number;
  height: number;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  original?: string;
}

interface FireImageRefProps extends ViewProps {
  imageRef?: DocumentReference<ImageData>;
  width: number;
  height?: number;
}

interface FireImageProps extends ViewProps {
  imageData: ImageData;
  width: number;
  height?: number;
  path?: string;
  // sizePreference: "sm" | "md" | "lg" | "xl" | "original"
}

const getImgURL = (img: ImageData, width: number) => {
  const imgWidth = PixelRatio.getPixelSizeForLayoutSize(width);
  const selected = [
    { p: img.sm, s: 120 },
    { p: img.md, s: 240 },
    { p: img.lg, s: 480 },
    { p: img.xl, s: 960 },
    { p: img.original, s: 1920 }
  ].sort((a, b) => {
    return Math.abs(a.s - imgWidth) - Math.abs(b.s - imgWidth);
  })[0];
  return selected ? selected.p : undefined;
};

export const FireImageRef: SFC<FireImageRefProps> = ({
  imageRef,
  width,
  height,
  ...props
}) => {
  const [image] = useDocument(imageRef, (img, lastImg) => {
    const uri = img && getImgURL(img, width);
    const lastUri = lastImg && getImgURL(lastImg, width);
    return uri !== lastUri;
  });
  return image ? (
    <FireImage
      imageData={image}
      {...props}
      width={width}
      path={imageRef && imageRef.path}
    />
  ) : (
    <View {...props} />
  );
};

export const FireImage: SFC<FireImageProps> = ({
  imageData,
  width,
  height,
  style,
  path,
  ...rest
}) => {
  const sizeStyle = {
    width,
    height: height || (width * imageData.height) / imageData.width
  };
  const [opacity] = useState(new Animated.Value(0));
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setLoaded(false);
    setCompleted(false);
    opacity.setValue(0);
  }, [path]);
  const uri = getImgURL(imageData, width);
  return (
    <View style={[style, sizeStyle]} {...rest}>
      {completed ? null : (
        <Image
          style={StyleSheet.absoluteFill}
          blurRadius={1}
          source={{ uri: `data:image/png;base64,${imageData.base64}`, width }}
        />
      )}
      <Animated.Image
        style={[StyleSheet.absoluteFill, { opacity }]}
        onLoad={() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }).start(() => setCompleted(true));
          setLoaded(true);
        }}
        source={{ uri, width, cache: "reload" }}
      />
      <ActivityIndicator
        animating={!loaded}
        style={StyleSheet.absoluteFill}
        color={"white"}
      />
    </View>
  );
};

export default FireImage;
