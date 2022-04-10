const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("task", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["notStarted", "inProgress", "completed"],
      allowNull: false,
    },
  });
};
