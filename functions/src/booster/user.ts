import * as functions from "firebase-functions";

export const onUserCreate = functions.auth.user().onCreate(user => {
  console.log(
    `User created: ${user.uid} from ${JSON.stringify(user.providerData)}`
  );
  // setup for user
});

export const onUserDelete = functions.auth.user().onDelete(user => {});
