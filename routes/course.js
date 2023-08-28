const router = require("express").Router();

const courseRoute = router;
const courseController = require("../controllers/courses.controller");
const course = require("../models/courses");

// Basic Crud Routing.

courseRoute.get("/Course", courseController.Getcourses, async (req, res) => {
  res.status(200).send(res.locals.courses);
});

courseRoute.post("/Course", courseController.Addcourses, async (req, res) => {
  res.status(200).send(res.locals.Addcourses);
});

module.exports = courseRoute;
