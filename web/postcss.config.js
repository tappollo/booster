const purgeCss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.tsx", "./public/**/*.html"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgeCss] : [])
  ]
};
