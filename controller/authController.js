const blogModel = require('../model/blogModel')
const calcReadTime = require("./readingTime");


// create a blog by an author
exports.createBlog = async (req, res, next) => {
    const body = req.body
    const user = req.user
    const readingTime = calcReadTime.calculateReadTime(body.body)


    if (await blogModel.findOne({ title: req.body.title })) {
      res.status(202).json({ message: "title already exist, try another title"})
      return
    }


    const blog = await blogModel.create({
        title: body.title,
        body: body.body,
        description: body.description,
        tags: body.tags,
        readingTime,
        writtenby: body.writtenby,
        author: user
    })

     if (!blog) {
       return res.status(404).json({ status: false, message: "Blog cannot be created, Title must have been taken", blog: null });
     }

    return res.json({ status: true, message: "Blog created successfully", blog})
}






// to get blogs each authors created
exports.getBlogs = async (req, res, next ) => {
  const { query } = req
  const { state, page = 0, per_page = 5 } = query;
  const findQuery = {author: req.user._id}

  if (state) {
    findQuery.state = state
  }
  const blogs = await blogModel.find(findQuery).populate('author', { firstname: 1, lastname: 1 }).skip(page).limit(per_page)

  return res.json({ status: true, blogs });
};


// to get a blog by an id
exports.getBlogById = async (req, res) => {
  const { id } = req.query
  const blog = await blogModel.findById(id).populate('author', { firstname: 1, lastname: 1 })

  if (!blog) {
    return res.status(404).json({ status: false, message: "article not found or not exist", blog: null})
  }

  return res.json({ status: true, blog });
};



//to update a blog or an article
exports.updateArticle = async (req, res) => {
    const { id } = req.query
    const { state } = req.body
    
    const blog = await blogModel.findOne({_id: id, author: req.user}).populate('author', { firstname: 1, lastname: 1 })

    if (!blog) {
        return res.status(404).json({ status: false, message: "article not found or not exist", blog: null})
    }

    if (state == blog.state) {
        return res.status(422).json({ status: false, blog: null, message: "you are still in the 'draft' state"})
    }

    blog.state = state

    await blog.save()

    return res.json({ status: true, blog})
}



// to edit an article
exports.editArticle = async (req, res) => {
  const { id } = req.query;
  const body = req.body;

  const blog = await blogModel.findOneAndUpdate({_id: id, author: req.user}, body, {new: true}).populate('author', { firstname: 1, lastname: 1 });

  if (!blog) {
    return res.status(404).json({ status: false, message: "article not found or not exist", blog: null });
  }

  return res.json({ status: true, blog });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.query;

  const blog = await blogModel.findOneAndDelete({ _id: id, author: req.user});

  if (!blog) {
    return res.status(404).json({ status: false, message: "article not found or not exist", blog: null });
  }


  return res.json({ status: true, message: "article deleted successfully" });
};