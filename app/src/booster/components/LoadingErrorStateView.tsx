import { LoadingErrorState } from "../functions/firebase/firestoreHooks";
import { default as React, ReactElement } from "react";
import { Center } from "../pages/chat/components/Layout";
import { ActivityIndicator, Text } from "react-native";

function LoadingErrorStateView<T>(props: {
  state: LoadingErrorState<T>;
  isEmpty?: (value: T) => boolean;
  emptyText?: string;
  children: (value: T) => ReactElement;
}) {
  const { loading, value, error } = props.state;
  if (loading || value == null) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }
  if (props.isEmpty?.(value)) {
    return (
      <Center>
        <Text style={{ color: "#888888" }}>
          {props.emptyText || "No conversation yet!"}
        </Text>
      </Center>
    );
  }
  if (error != null) {
    return (
      <Center>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </Center>
    );
  }
  return props.children(value);
}

export default LoadingErrorStateView;
