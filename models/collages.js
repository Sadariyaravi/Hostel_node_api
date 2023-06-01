const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const colleges = sequalize.define("colleges", {
  collageName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  collageAdress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = colleges;
