const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const largest = likes.indexOf(Math.max(...likes))
  return blogs[largest].title
}

const mostBlogs = (blogs) => {
  
}

// const favoriteBlog = (blogs) => {
//   const maxIndex = blogs.reduce((currentIndex, blog, index, array) => {
//     return blog.likes > array[currentIndex].likes ? index : currentIndex
//   }, 0)

//   return blogs[maxIndex].title
// }

// const favoriteBlog = (blogs) => {
//   return blogs.reduce((a, b) => 
//     b.likes > a.likes ? b : a
//   ).title
// }

module.exports = {
  dummy, totalLikes, favoriteBlog
}

