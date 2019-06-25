import React from "react";
import { Dimensions } from "react-native";
import Video from "react-native-video";
import {
  createStackNavigator,
  NavigationScreenComponent as NSC,
  NavigationScreenOptions as NSO
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Column } from "../../components";
import { colors, fonts } from "../../styles";

const { width } = Dimensions.get("window");

const VideoPage: NSC<{}, NSO> = () => {
  return (
    <Column expand scroll>
      <Video
        style={{
          width: width - 40,
          height: 260,
          alignSelf: "center",
          marginTop: 40
        }}
        source={{
          uri:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }}
        paused
        controls
      />
    </Column>
  );
};

VideoPage.navigationOptions = {
  title: "Video Test",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor as string} />
  )
};

const Navigator = createStackNavigator(
  {
    VideoPage
  },
  {
    initialRouteName: "VideoPage",
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
  title: "Video",
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Icon name="md-checkbox-outline" size={17} color={tintColor} />
  )
};

export default Navigator;
