import { useActionSheet as useExpoActionSheet } from "@expo/react-native-action-sheet";
import { useCallback } from "react";

export type ActionSheetItem = {
  type?: "normal" | "destructive" | "cancel";
  title: string;
  onPress?: () => void;
};

export interface ActionSheetOptions {
  title?: string;
  message?: string;
  tintColor?: string;
  anchor?: number;
  defaultCancel?: boolean;
}

export const useActionSheet = () => {
  const { showActionSheetWithOptions } = useExpoActionSheet();
  return useCallback(
    (items: ActionSheetItem[], options: Partial<ActionSheetOptions> = {}) => {
      showActionSheetWithOptions(
        {
          ...options,
          options: items
            .map((i) => i.title)
            .concat(options.defaultCancel ? ["Cancel"] : []),
          cancelButtonIndex: options.defaultCancel
            ? items.length
            : items.findIndex((i) => i.type === "cancel"),
          destructiveButtonIndex: items.findIndex(
            (i) => i.type === "destructive"
          ),
        },
        (i) => {
          items[i]?.onPress?.();
        }
      );
    },
    [showActionSheetWithOptions]
  );
};
