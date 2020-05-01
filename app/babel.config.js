module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "macros",
    "babel-plugin-styled-components",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
