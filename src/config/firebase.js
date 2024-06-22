// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-like-glovo.firebaseio.com",
});

module.exports = admin;
