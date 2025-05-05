const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { usersInDb } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // returns username and id field
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // fetch blog from the database
  const blog = await Blog.findById(request.params.id)
  // get the id from the jwt token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('blog id:', blog.user.toString())
  console.log('user id:', decodedToken.id.toString())

  // compare the jwt id token and who created the blog (blog id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(403).json({ error: 'not authorized to delete the blog'})
  }  
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title,
  blog.author = author,
  blog.url = url,
  blog.likes = likes

  const savedBlog = await blog.save()
  response.status(200).json(savedBlog)
})

module.exports = blogsRouter