const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs => {
  return blogs.reduce((a, b) => +a + +b.likes, 0)
  
})
const favoriteBlog  = (blogs => {
  var topBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
  return {title: topBlog.title,
          author: topBlog.author,
          likes: topBlog.likes
         }
})
const mostBlogs = (blogs => {
  let counts = {};
  let maxValue = 0;
  var topAuth = null;
  for (const blog of blogs) {
    if (!(blog.author in counts)) {
      counts[blog.author] = 1;
    } else {
      counts[blog.author] += 1;
    }
    if (counts[blog.author] > maxValue) {
      maxValue += 1;
      topAuth = blog.author;
    }
  }
  return {author: topAuth,
          blogs: counts[topAuth]
          }
})

const mostLikes = (blogs =>{
  let counts = {};
  let maxValue = 0;
  var topAuth = null;
  for (const blog of blogs) {
    if (!(blog.author in counts)) {
      counts[blog.author] = blog.likes;
    } else {
      counts[blog.author] += blog.likes;
    }
    if (counts[blog.author] > maxValue) {
      maxValue += counts[blog.author];
      topAuth = blog.author;
    }
  }
  return {author: topAuth,
          likes: counts[topAuth]
          }
})
module.exports = {
  dummy, totalLikes,favoriteBlog,mostBlogs, mostLikes
}