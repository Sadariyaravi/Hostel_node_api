const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const collageCourses = sequalize.define("collage_courses", {
  collageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = collageCourses;
