// import packages
require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequalize = require("./config/db.connection");
require("./models/index");
const cookieParser = require("cookie-parser");
// Import All Route for use
const RoleRoute = require("./routes/role.route");
const UserRoute = require("./routes/user.route");
const PostRouter = require("./routes/post.route");
const morgan = require("morgan");
const { any } = require("joi");
const collegeRouter = require("./routes/college");
const courseRoute = require("./routes/course");

// use bodyparser for access body data in http request
// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  }),
  cookieParser(),
  bodyParser.json(),
  morgan("dev")
);

//Declare Routes for api
app.use(UserRoute, RoleRoute, PostRouter, collegeRouter, courseRoute);

// Route Not Found Errors(for invalid routes)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Invalid route!" });
});

// Error handler
app.use((error, req, res, next) => {
  if (error.error && error.error.message) {
    res
      .status(error.error.status || 500)
      .send({ message: error.error.message });
  } else {
    res
      .status(error.status || 500)
      .send({ message: error.Message || error.message });
  }
});

// synchronize all sequalize model with database *DB connection
sequalize.sync({ alter: false }, (error, result) => {
  if (error) return error;
  else return result;
});

// Running server on port_no : 3001
app.listen(process.env.PORT || 3333, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
