const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { veryfyToken, verifyAdmin } = require("../../middlewares/auth");

router.post("", veryfyToken, verifyAdmin, controller.addArticles);
router.get("", controller.findAllArticles);
router.put("", veryfyToken, verifyAdmin, controller.UpdateArticle);

module.exports = router;
