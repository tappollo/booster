import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters } from "@storybook/react-native";

addDecorator(withKnobs);

addParameters({
  knobs: {
    escapeHTML: false
  }
});
