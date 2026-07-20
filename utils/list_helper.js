const _ = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return Number(blogs[0].likes);
  return blogs.reduce((sum, item) => item.likes + sum, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return blogs[0];
  let blogIndexWithHighestLikes,
    highestLikes = 0;
  blogs.forEach((blog, index) => {
    if (blog.likes > highestLikes) {
      highestLikes = blog.likes;
      blogIndexWithHighestLikes = index;
    }
  });
  return blogs[blogIndexWithHighestLikes];
};

const mostBlogs = (blogs) => {
  let authorNameWithMostBlogs, noOfBlogs;
  if (blogs.length === 0) return null;
  if (blogs.length === 1) {
    authorNameWithMostBlogs = blogs[0].author;
    noOfBlogs = 1;
  } else {
    noOfBlogs = _(blogs)
      .map("author")
      .countBy()
      .values()
      .sort((a, b) => b - a)
      .value()[0];
    authorNameWithMostBlogs = _(blogs).map("author").countBy().invert().value()[
      `${noOfBlogs}`
    ];
  }
  return {
    author: authorNameWithMostBlogs,
    blogs: noOfBlogs,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
