import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

// Using lazy functions to improve cold boot speed
const lazyFunctions = {
  status: () => require("./booster/status").statusCheck,
  user: () => require("./booster/user"),
  image: () => require("./booster/image"),
  chat: () => require("./booster/chat"),
  payments: () => require("./booster/payment/payment"),
  // profile: () => require("./profile"),
  // user: () => require("./user"),
  // exp: () => require("./exports"),
  // search: () => require("./search")
};

const functionName = process.env.FUNCTION_NAME;
(Object.keys(lazyFunctions) as Array<keyof typeof lazyFunctions>).forEach(
  (name) => {
    if (!functionName || functionName.startsWith(name)) {
      exports[name] = lazyFunctions[name]();
    }
  }
);
