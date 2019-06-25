workflow "Test" {
  on = "push"
  resolves = ["TypeCheck and TSLint"]
}

action "TypeCheck and TSLint" {
  uses = "./.github/yarn"
  args = "ci"
}

workflow "Deploy services on PR merge" {
    on = "push"
    resolves = ["Deploy Services"]
}

action "Filter Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy Services" {
  needs = ["Filter Master Branch"]
  uses = "./.github/yarn"
  args = "deploy:dev"
  secrets = [
    "FIREBASE_TOKEN"
  ]
}

workflow "Deploy app on Release" {
  on = "release"
  resolves = ["Deploy Apps"]
}

action "On Release Published" {
  uses = "actions/bin/filter@master"
  args = "action published"
}

action "Deploy Apps" {
  needs = ["On Release Published"]
  uses = "./.github/yarn"
  args = "workspace @mercy/scripts deploy:ci"
  secrets = [
    "FIREBASE_TOKEN",
    "MAC_PASSWORD",
    "MAC_USERNAME",
    "MAC_HOST",
    "MAC_PORT",
    "MAC_PROJECT_PATH"
  ]
}
