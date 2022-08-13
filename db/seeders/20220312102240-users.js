'use strict';
/*const {articles,users} = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const article = await articles.findAll()
    if(!article.length){
      let data = [
        {
          title: 'root',
          body:"Its A first Article from seed",
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
      return await queryInterface.bulkInsert('users', [...data],{});
    } /*else {
      return
    }*/
    /*const users = await users.findAll()
    if(!users.length){
      let admin={
           isAdmin:true
                }
                return await queryInterface.bulkInsert('articles',[...admin])
    }
  },

  async down (queryInterface, Sequelize) {
    return null; //queryInterface.bulkDelete('users', null, {});
  }
};*/
