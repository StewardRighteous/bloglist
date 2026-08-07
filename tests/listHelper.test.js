const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");

test("dummy returns 1", () => {
  assert.strictEqual(listHelper.dummy([]), 1);
});

const emptyBlog = [];

const listWithOneBlog = testHelper.singleBlog;

const blogs = testHelper.initialBlogs;

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(emptyBlog), 0);
  });
  test("when list has only one blog, equals like of that", () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
  });

  test("of a bigger list calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36);
  });
});

describe("favorite blog", () => {
  test(
    "when there is no list then null",
    () => listHelper.favoriteBlog(emptyBlog),
    null,
  );
  test("when list has one that one is the favourite", () =>
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      listWithOneBlog[0],
    ));
  test("of all list return the favorite blog", () =>
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]));
  test("when multiple favourites return any one", () => {
    const blogWithMultipleFavourites = [
      ...blogs,
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 12,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(
      listHelper.favoriteBlog(blogWithMultipleFavourites),
      blogWithMultipleFavourites[2] || blogWithMultipleFavourites[6],
    );
  });
});

describe("most blogs", () => {
  test("when list has no blogs return null", () =>
    assert.strictEqual(listHelper.mostBlogs(emptyBlog), null));
  test("when list has one blog return author and 1", () =>
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: listWithOneBlog[0].author,
      blogs: 1,
    }));
  test("of all list return author who wrote most blogs and number of blogs he wrote", () =>
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    }));
  test("when multiple author with blogs return any one", () => {
    const blogWithMultipleAuthors = [
      ...blogs,
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 12,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(
      listHelper.mostBlogs(blogWithMultipleAuthors),
      {
        author: "Robert C. Martin",
        blogs: 3,
      } || {
        author: "Edsger W. Dijkstra",
        blogs: 3,
      },
    );
  });
});

describe("most likes", () => {
  test("when there is no list return null", () =>
    assert.strictEqual(listHelper.mostLikes(emptyBlog), null));
  test("when there is only one return the author and number of likes", () =>
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      likes: 5,
    }));
  test("of all list return blog with more likes and its respective author", () =>
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 12,
    }));
  test("when multiple top liked blogs, return any one", () => {
    const blogWithMultipleMostLikes = [
      ...blogs,
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Robert C. Martin",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 12,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(
      listHelper.mostLikes(blogWithMultipleMostLikes),
      {
        author: "Edsger W. Dijkstra",
        likes: 12,
      } || { author: "Robert C. Martin", likes: 12 },
    );
  });
});
