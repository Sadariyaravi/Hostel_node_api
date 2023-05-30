const admin = require("firebase-admin");
const serviceAccount = require("./hostelmanagement2-f2006-firebase-adminsdk-bi0wz-d188010f6a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "hostelmanagement2-f2006.appspot.com",
});
// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
