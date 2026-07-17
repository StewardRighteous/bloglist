const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return Number(blogs[0].likes);
  return blogs.reduce((sum, item) => item.likes + sum, 0);
};

module.exports = { dummy, totalLikes };
