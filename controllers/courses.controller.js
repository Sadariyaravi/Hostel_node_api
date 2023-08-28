const courses = require("../models/courses");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");
const sequalize = require("../config/db.connection");

const Getcourses = async (req, res, next) => {
  try {
    courses.findAll().then((course) => {
      res.locals.courses = course;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const Addcourses = async (req, res, next) => {
  try {
    courses.create({
      coursename: req.body.coursename,
      courseDurationInYear: req.body.courseDurationInYear,
    });
    res.locals.Addcourses = `"${req.body.coursename}" -- New course added`;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddcollegeWithcourse = async (req,res,next) => {
  try{

  }
  catch(error){
    
  }
}
module.exports = { Getcourses, Addcourses };