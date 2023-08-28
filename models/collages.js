const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const colleges = sequalize.define("colleges", {
  collegeName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  collegeAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = colleges;
