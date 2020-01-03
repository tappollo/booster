import { withKnobs } from "@storybook/addon-knobs";
import {
  addDecorator,
  addParameters,
  configure
} from "@storybook/react-native";

addDecorator(withKnobs);

addParameters({
  knobs: {
    escapeHTML: false
  }
});
