const router = require("express").Router();

const UserRoute = router;
const UserController = require("../controllers/user.controller");
const Users = require("../models/User");
const authentication = require("../middlewares/authentication");
const generateToken = require("../middlewares/tokencreate");
const cookieParser = require("cookie-parser");
UserRoute.get("/User", UserController.GetUsers, async (req, res) => {
  res.status(200).send(res.locals.results);
});

// For User Login with number and password params.
UserRoute.post(
  "/login",
  cookieParser(),
  UserController.getUserByContactNo,
  generateToken,
  async (req, res) => {
    res.cookie("acess_token", res.locals.userdata.token, {
      httpOnly: false,
      expires: new Date(Date.now() + 120 * 60 * 1000),
      secure: true,
    });
    res.cookie("userName", res.locals.userdata.username, {
      httpOnly: false,
      expires: new Date(Date.now() + 120 * 60 * 1000),
      secure: true,
    });
    res.status(200);
    res.json({
      message: "Logged in successfully",
    });
  }
);

// For Token verification.
UserRoute.get("/verify", authentication, async (req, res) => {
  res.status(200).send(res.locals.tokendata);
});

// Signup Apis for user with password hash
UserRoute.post("/SignUp", UserController.AddUser, async (req, res) => {
  res.status(200).send(res.locals.SignupStatus);
});

module.exports = UserRoute;
