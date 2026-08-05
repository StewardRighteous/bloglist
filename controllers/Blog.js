const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => res.status(201).json(result));
});

module.exports = blogRouter;
