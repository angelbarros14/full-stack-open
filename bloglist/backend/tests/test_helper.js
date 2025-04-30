const Blog = require('../models/blog')

const blogs = [
  {
    title: 'new blog',
    author: 'a',
    url: 'http://localhost:3003',
    likes: 1
  },
  {
    title: 'another new blog',
    author: 'a',
    url: 'http://localhost:3003',
    likes: 5
  },
  {
    title: 'another new blog blog',
    author: 'a',
    url: 'http://localhost:3003',
    likes: 10
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { blogs, blogsInDb }