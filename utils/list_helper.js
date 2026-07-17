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

module.exports = { dummy, totalLikes, favoriteBlog };
