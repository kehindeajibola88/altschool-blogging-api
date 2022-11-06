const express = require("express");
const blogController = require("../controller/authController");

const blogRouter = express.Router();

blogRouter.post("/", blogController.createBlog);

blogRouter.get("/", blogController.getBlogs);

blogRouter.get("/blogId", blogController.getBlogById);

blogRouter.patch("/state", blogController.updateArticle);

blogRouter.patch("/edit", blogController.editArticle);

blogRouter.delete("/", blogController.deleteBlog);

module.exports = blogRouter;
