var AWS = require("aws-sdk");
var uuid = require("uuid");

var bucketname = "node-sdk-exapmle-" + uuid.v4();
var keyname = "Key.txt";

var bucketPromise = new AWS.S3({ apiVersion: "2006/03/01" })
  .createBucket({ Bucket: bucketname })
  .promise();

bucketPromise
  .then((data) => {
    var objectParams = {
      Bucket: bucketname,
      Key: keyname,
      Body: "this is my bucket",
    };

    var uploadPromise = new AWS.S3({ apiVersion: "2006/03/01" })
      .putObject(objectParams)
      .promise();
    uploadPromise.then((data) => {
      console.log(data);
    });
  })
  .catch((err) => {
    console.log(err, err.stack);
  });