import React, { useState, FunctionComponent as SFC, ReactElement } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { colors } from "../styles";

interface RadioControllProps {
  label: string;
  selectedLabel: string;
  onPress: () => void;
}
const RadioControll: SFC<RadioControllProps> = ({
  label,
  selectedLabel,
  onPress
}) => {
  const selected = label === selectedLabel;
  return (
    <TouchableOpacity
      style={{ alignItems: "center", marginBottom: 1 }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: colors.white,
          opacity: selected ? 1 : 0.6,
          margin: 5
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: 36,
          height: 2,
          backgroundColor: selected ? colors.white : "transparent"
        }}
      />
    </TouchableOpacity>
  );
};

export const useRadioButtons = (labels: string[], defaultLabel?: string) => {
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel || labels[0]);
  return [
    selectedLabel,
    labels.map(label => (
      <RadioControll
        label={label}
        selectedLabel={selectedLabel}
        onPress={() => setSelectedLabel(label)}
        key={label}
      />
    ))
  ] as [string, ReactElement[]];
};
