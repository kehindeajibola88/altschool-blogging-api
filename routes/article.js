const express = require("express");
const articleController = require('../controller/articleController')

const articleRouter = express.Router();

// get articles
articleRouter.get("/", articleController.getAllPublishedBlogs);
articleRouter.get("/articleid", articleController.getOnePublish);

module.exports = articleRouter;
