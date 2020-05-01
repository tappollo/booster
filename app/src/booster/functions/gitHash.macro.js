const { execSync } = require("child_process");
const { createMacro } = require("babel-plugin-macros");

// calling git from the command line should be done just once
const gitInfo = {
  hash: execSync("git rev-parse HEAD").toString().trim(),
  count: execSync("git rev-list --count HEAD").toString().trim(),
};

const getGitInformation = ({ references }) => {
  const sourceString = `(function() { return ${JSON.stringify(gitInfo)}; })`;
  references.default.forEach((referencePath) => {
    referencePath.replaceWithSourceString(sourceString);
  });
};

module.exports = createMacro(getGitInformation);
