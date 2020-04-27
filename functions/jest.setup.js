const admin = require("firebase-admin");
const adminSDK = require("./src/adminSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(adminSDK),
});

jest.setTimeout(30 * 1000);
