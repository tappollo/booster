import React, { FunctionComponent as SFC, ReactNode } from "react";
import { StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import { Row } from "./Container";
import { Heading3 } from "./Typegraphy";
import Icon from "react-native-vector-icons/Ionicons";
import { fonts, colors, margins } from "../styles";

interface CellProps extends ViewProps {
  separator?: boolean;
  disclosure?: boolean;
  color?: string;
  onPress?: () => void;
  leftView?: ReactNode;
  rightView?: ReactNode;
}

const Cell: SFC<CellProps> = ({
  onPress,
  leftView,
  rightView,
  children,
  disclosure,
  color,
  separator,
  style,
  ...rest
}) => (
  <TouchableOpacity onPress={onPress}>
    <Row style={[styles.cell, style]} {...rest}>
      {leftView}
      <Row expand style={[separator ? styles.separator : null, styles.wrapper]}>
        <Row expand style={styles.content}>
          {typeof children === "string" ? (
            <Heading3 color={color}>{children}</Heading3>
          ) : (
            children
          )}
        </Row>
        {rightView}
        {disclosure ? (
          <Icon name="ios-arrow-forward" size={24} style={styles.accessory} />
        ) : null}
      </Row>
    </Row>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    backgroundColor: colors.white,
    height: 48,
    alignItems: "center"
  },
  wrapper: {
    alignItems: "center",
    marginLeft: margins.base,
    alignSelf: "stretch"
  },
  separator: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.67
  },
  content: {
    alignItems: "center"
  },
  accessory: {
    color: colors.lightGrey,
    marginRight: margins.base
  }
});

export default Cell;
