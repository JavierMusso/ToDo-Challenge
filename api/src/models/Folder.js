const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("folder", {
    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
