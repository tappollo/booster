import { Alert, TextInputProps } from "react-native";
import React, { useCallback, useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

const useModalInput = ({
  title,
  ...props
}: { title: string } & TextInputProps) => {
  const [onResult, setOnResult] = useState<
    (result: string) => void | Promise<void>
  >();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const element = (
    <Portal>
      <Dialog
        css={`
          margin-top: -200px;
        `}
        visible={onResult != null}
        onDismiss={() => setOnResult(undefined)}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus={true}
            dense={true}
            value={text}
            onChangeText={setText}
            {...props}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            loading={loading}
            disabled={!text}
            onPress={async () => {
              const result = onResult?.(text);
              if (result == null) {
                setOnResult(undefined);
                return;
              }
              try {
                setLoading(true);
                await result;
                setOnResult(undefined);
              } catch (e) {
                Alert.alert(e.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
  const getInput = useCallback(
    (action: typeof onResult) => {
      setText("");
      setOnResult(() => action);
    },
    [setOnResult, setText, onResult]
  );
  return {
    getInput,
    element,
  };
};

export default useModalInput;
