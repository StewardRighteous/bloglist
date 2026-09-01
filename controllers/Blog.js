const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  if (!blog.title && !blog.url)
    return res.status(400).json({ error: "bad request" });
  if (!blog.likes) blog.likes = 0;
  const result = await blog.save();
  res.status(201).json(result);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = blogRouter;
