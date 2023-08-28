var AWS = require("aws-sdk");

var cloudfront = new AWS.CloudFront();
cloudfront.associateAlias(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
