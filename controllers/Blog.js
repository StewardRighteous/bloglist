const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  if (blog.likes === undefined) blog.likes = 0;
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
