const {
  override,
  addBundleVisualizer,
  fixBabelImports
} = require("customize-cra");

module.exports = override(
  process.env.BUNDLE_VISUALIZE && addBundleVisualizer(),
  fixBabelImports("import", {
    libraryName: "lodash",
    libraryDirectory: ""
  })
);
