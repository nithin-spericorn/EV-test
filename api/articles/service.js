const db = require("../../db/models");

module.exports = {
  create: async (data = {}) => {
    const info = await db.articles.create({
      ...data,
    });
    return info ? info.dataValues : null;
  },
  findAllArticles: async (req, res) => {
    const Tickets = await db.articles.findAll({ limit: 5, order: [['updatedAt', 'DESC']]})
    console.log("ddd",Tickets)
    return Tickets ? Tickets : {};
  },
  updateArticles: async (data) => {
    let res = {};
    const info = await db.articles.update(
      { title: data.title, content: data.content },
      { where: { id: data.id } }
    );
    if (info) res = await db.articles.findOne({ id: data.id });
    return res;
  },
  getOneArticle:async(id)=>{
    const info = await db.articles.findOne(
      { where: { id: id } }
    );
    return info?info:{};
  }
};
