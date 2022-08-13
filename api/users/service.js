const db = require("../../db/models");

module.exports = {
  create: async (data = {}) => {
    const info = await db.users.create({
      ...data,
    });
    return info ? info : null;
  },
  find: async (id = {}) => {
    const user = await db.users.findOne({ where: id });
    return user ? user : null;
  },
};
