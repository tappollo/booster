import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Column } from "../../components/Container";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { margins, colors, fonts } from "../../styles";
import {
  Heading1,
  Heading2,
  Heading3,
  Body,
  Secondary,
  Tertiary
} from "../../components/Typegraphy";

const StyleGuide: NSC<{}, NSO> = () => (
  <Column expand scroll>
    <Heading1 style={styles.padded}>Heading1</Heading1>
    <Heading2 style={styles.padded}>Heading2</Heading2>
    <Heading3 style={styles.padded}>Heading3</Heading3>
    <Body style={styles.padded}>Body</Body>
    <Secondary style={styles.padded}>Secondary</Secondary>
    <Tertiary style={styles.padded}>Tertiary</Tertiary>
    <TextField label="Name" style={styles.input} />
    <TextField label="Email" style={styles.input} />
    <Button title="Some" style={styles.padded} />
    <Button title="Other" style={styles.padded} />
  </Column>
);

const styles = StyleSheet.create({
  input: {
    marginHorizontal: margins.base
  },
  padded: {
    marginHorizontal: margins.base,
    marginVertical: margins.tiny
  }
});

StyleGuide.navigationOptions = {
  title: "Styles",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor as string} />
  )
};

const Navigator = createStackNavigator(
  {
    StyleGuide
  },
  {
    initialRouteName: "StyleGuide",
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        height: 45,
        backgroundColor: colors.blue,
        borderBottomWidth: 0,
        elevation: 0
      },
      headerTitleStyle: {
        ...fonts.heading3,
        color: colors.white
      }
    }
  }
);

Navigator.navigationOptions = {
  title: "Styles",
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor} />
  )
};

export default Navigator;
