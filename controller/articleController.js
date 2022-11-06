const User = require('../model/userModel')
const blogModel = require("../model/blogModel");


//to get all published article by any user
exports.getAllPublishedBlogs = async (req, res, next) => {
  const { query } = req;
  const { auth, title, tags, order = "asc", order_by = "timestamp", page = 0, per_page = 20 } = query;
  const findQuery = { state: "published" };

  if (auth) {
    const user = await User.find( {firstname: auth })
    console.log(user)
    const author = user[0]._id
    console.log(author)
    findQuery.author = author;
  }

  if (title) {
    findQuery.title = title;
  }

  if (tags) {
    findQuery.tags = {
      $in: tags.split(",").map((tag) => {
        return tag.trim()
      })
    }
  }

  const sortQuery = {}

  const sortAttributes = order_by.split(",").map((order) => {
    return order.trim()
  })

  for (const attribute of sortAttributes) {
    if (order == "asc" && order_by) {
      sortQuery[attribute] = 1
    }

    if (order == "desc" && order_by) {
      sortQuery[attribute] = -1;
    }
  }
  const blogs = await blogModel.find(findQuery).populate("author", { firstname: 1, lastname: 1 }).sort(sortQuery).skip(page).limit(per_page);

  if (!blogs) {
    return res.status(404).json({ status: false, message: "something went wrong", blog: null})
  }

  return res.json({ status: true, blogs });
};


// to get one published article
exports.getOnePublish = async (req, res) => {
  const { id } = req.query
  const blog = await blogModel.findOne({ _id: id, state: "published" }).populate('author', { firstname: 1, lastname: 1 })

  blog.readCount++

  blog.save()

  if (!blog) {
    return res.status(404).json({ status: false, message: "article not found or not exist", blog: null})
  }

  return res.json({ status: true, blog });
};