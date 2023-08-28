const router = require("express").Router();

const collegeRouter = router;
const collegeController = require("../controllers/colleges.controller");
const college = require("../models/collages");

// Basic Crud Routing.

collegeRouter.get(
  "/College",
  collegeController.Getcolleges,
  async (req, res) => {
    res.status(200).send(res.locals.colleges);
  }
);

collegeRouter.post(
  "/College",
  collegeController.Addcolleges,
  async (req, res) => {
    res.status(200).send(res.locals.addcollege);
  }
);

module.exports = collegeRouter;
