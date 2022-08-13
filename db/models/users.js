"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    isAdmin: { type: DataTypes.BOOLEAN, default: false },
  });

  return users;
};
