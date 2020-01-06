module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: ["./assets/fonts/"],
  dependencies: {
    "react-native-video": {
      platforms: {
        android: {
          sourceDir: "../node_modules/react-native-video/android-exoplayer"
        }
      }
    },
    "react-native-vector-icons": {
      assets: []
    }
  }
};
