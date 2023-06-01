const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const AdmissionDetail = sequalize.define("AdmissionDetail", {
  StudentFullName: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  BirthDate: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  CollageId: {
    type: DataTypes.INTEGER,
    allownull: false,
  },
  CourseId: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  PhoneNumber: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  EmailAddress: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  PermanentAddress: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  Relatives_Address: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  RequestStatus: {
    type: DataTypes.BOOLEAN,
    allownull: true,
  },
  RequestApprovedBy: {
    type: DataTypes.INTEGER,
    allownull: true,
  },
});

module.exports = Posts;
