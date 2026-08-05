const { beforeEach, test, after } = require("node:test");
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

after(async () => await mongoose.connection.close());
