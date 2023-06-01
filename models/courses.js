const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const Courses = sequalize.define("courses", {
  coursename: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseDurationInYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Courses;
