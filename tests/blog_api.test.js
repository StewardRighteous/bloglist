const { beforeEach, test, after, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const app = require("../app");
const testHelper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(testHelper.initialBlogs);
});

describe("BlogList API", () => {
  describe("retrieving all blog list", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/);
    });

    test("all blogs are returned", async () => {
      const blogs = await api.get("/api/blogs");
      assert.strictEqual(blogs.body.length, testHelper.initialBlogs.length);
    });

    test("unique identifier of the blog post named id", async () => {
      const blogs = await api.get("/api/blogs");
      assert(Object.keys(blogs.body[0]).includes("id"));
    });
  });

  describe("creating new bloglist", () => {
    test("new blog is added to the list of blogs", async () => {
      const newBlog = await api
        .post("/api/blogs")
        .send({
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
          likes: 5,
        })
        .expect(201)
        .expect("Content-type", /application\/json/);
      const blogs = await api.get("/api/blogs");
      assert.strictEqual(blogs.body.length, testHelper.initialBlogs.length + 1);
      assert.deepStrictEqual(blogs.body.at(-1), newBlog.body);
    });

    test("default likes for a blog is zero", async () => {
      const newBlog = await api
        .post("/api/blogs")
        .send({
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        })
        .expect(201)
        .expect("Content-type", /application\/json/);
      assert.strictEqual(newBlog.body.likes, 0);
    });

    test("if title and url missing then it is bad request", async () => {
      await api.post("/api/blogs").send({}).expect(400);
    });
  });

  describe("deleting blog list", () => {
    test("blog is deleted successfully", async () => {
      const blogs = await api.get("/api/blogs");
      await api.delete(`/api/blogs/${blogs.body[0].id}`).expect(204);
      const updatedBlogs = await api.get("/api/blogs");
      assert.strictEqual(updatedBlogs.body.length, blogs.body.length - 1);
    });
  });
});

after(async () => await mongoose.connection.close());
