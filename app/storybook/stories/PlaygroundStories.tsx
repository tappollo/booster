import { storiesOf } from "@storybook/react-native/dist";
import { action } from "@storybook/addon-actions";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

const stories = storiesOf("Playground", module);

const TestPanGesture = (props: { log: (input: any) => void }) => {
  return (
    <PanGestureHandler
      minDist={10}
      onHandlerStateChange={(e) => {
        props.log(e.nativeEvent.state);
      }}
    >
      <View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

stories.add("Test Pan Gesture", () => {
  return <TestPanGesture log={action("log")} />;
});
