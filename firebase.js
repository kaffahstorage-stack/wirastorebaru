const admin = require("firebase-admin");

const serviceAccount = require("./marketplacewira-firebase-adminsdk-fbsvc-ec307a8f4f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marketplacewira-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

module.exports = db;
console.log("PROJECT ID:", serviceAccount.project_id);
console.log("CLIENT EMAIL:", serviceAccount.client_email);