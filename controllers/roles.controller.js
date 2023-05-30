const Roles = require("../models/role");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");
const sequalize = require("../config/db.connection");

const GetRoles = async (req, res, next) => {
  try {
    Roles.findAll().then((result) => {
      res.locals.results = result;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddRoles = async (req, res, next) => {
  console.log(req.body,'--------------------');
  try {
    try {
      const data = sequalize
        .query(`CALL "insert_role" (role => '${req.body.Role}')`)
        .then((data) => {
          res.locals.AddedRoles = `"${req.body.Role}" -- New Role added successfully`;
          next();
        });
    } catch (error) {
      next({ error: { status: SERVER_ERROR, message: error } });
    }
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const UpdateRoles = async (req, res, next) => {
  try {
    Roles.update(req.body, {
      where: { id: req.query.id },
    });
    res.locals.UpdatedRole = `Role Id : ${req.query.id} Updated Successfully`;
    next();
  } catch (error) {
    console.log(error);
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const DeleteRoles = async (req, res, next) => {
  try {
    Roles.destroy({
      where: { id: req.query.id },
    });
    res.locals.DeletedRoles = `Role Id : ${req.query.id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};
module.exports = { GetRoles, AddRoles, UpdateRoles, DeleteRoles };
