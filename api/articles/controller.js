const { failedResponse, goodResponse } = require("../../helper/response");
const service = require("./service");
const { Op } = require("sequelize");
const db = require("../../db/models");
const moment=require("moment")

exports.addArticles = async (req, res) => {
  try {
   let {title,content}=req.body
    let Articles = {};
   

      Articles = await service.create({
        title:title,
        content:content,
        PublishDate:moment().format('DD-MM-YYYY')
      });
    

    return res.json(goodResponse({Articles}," successfully Created"));
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
      data: {},
    });
  }
};
exports.findAllArticles = async (req, res) => {
  try {
    const Articles = await service.findAllArticles();
    return res.json(
      goodResponse(
        { Articles: Articles },
        "All Article successfully listed"
      )
    );
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
      data: {},
    });
  }
},
exports.UpdateArticle=async(req,res)=>{
  try{
    let {title,content,id}=req.body;

    //await db.articles.update({title:title,content:content} ,{where:{id:id}})
    let updatedArticle=await service.updateArticles(title,content,id)//db.articles.findOne({where:{id:id}})
    return res.json(
      goodResponse(
        { Article: updatedArticle },
        "Article successfully updated"
      )
    );
  }catch(e){
    return res.status(500).json({
      success: false,
      message: e.message,
      data: {},
    });
  }
}