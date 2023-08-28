const colleges = require("../models/collages");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");
const sequalize = require("../config/db.connection");

const Getcolleges = async (req, res, next) => {
  try {
    colleges.findAll().then((clg) => {
      res.locals.colleges = clg;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const Addcolleges = async (req, res, next) => {
  try {
    colleges.create({
      collegeName: req.body.collegeName,
      collegeAddress: req.body.collegeAddress,
    });
    res.locals.addcollege = `"${req.body.collegeName}" -- New college added`;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = { Getcolleges, Addcolleges };