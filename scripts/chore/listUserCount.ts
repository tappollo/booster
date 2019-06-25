import { setupFirebase } from "../utils/firebase";
import * as admin from "firebase-admin";

setupFirebase();

(async () => {
  const users = await admin.auth().listUsers();
  console.log(`You have ${users.users.length} users`);
})();
