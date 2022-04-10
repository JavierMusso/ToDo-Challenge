const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("task", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["not started", "in progress", "complete"],
      allowNull: false,
    },
  });
};
