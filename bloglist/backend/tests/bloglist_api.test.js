const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
  await Blog.insertMany(helper.blogs)
  console.log('added all blogs')
})

test('returns the correct number of blog post', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('verifies if the property is "id" not "_id"', async () => {
  const blogs = await helper.blogsInDb()
  console.log('this is the blogs:', blogs)

  const blogToVerify = blogs[0]
  console.log('blog to verify:', blogToVerify)

  const resultBlog = await api
    .get(`/api/blogs/${blogToVerify.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(resultBlog.body.id, blogToVerify.id)
  assert.strictEqual(resultBlog.body._id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'blog one',
    author: 'a',
    url: 'http://localhost:3003',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedListBlog = await helper.blogsInDb()
  console.log(updatedListBlog)
  assert.strictEqual(updatedListBlog.length, helper.blogs.length + 1)
})

test('set default to 0 if likes property is missing', async () => {
  const newBlog = {
    title: 'blog two',
    author: 'a',
    url: 'http://localhost:3003'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedListBlog = await helper.blogsInDb()
  const lastBlog = updatedListBlog[updatedListBlog.length - 1]
  console.log('the last blog is:', lastBlog)
  assert.strictEqual(lastBlog.likes, 0)
})

test('blog with missing properties are not added', async () => {
  const newBlog = {
    author: 'a',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const updatedListBlog = await helper.blogsInDb()
  assert.strictEqual(updatedListBlog.length, helper.blogs.length)
})

test.only('a blog can update number of likes', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToUpdate = blogAtStart[0]

  const updatedData = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 10
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, updatedData.likes)
})


test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  console.log('this is the blogs before:', blogsAtStart)
  const blogtoDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogtoDelete.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  console.log('this is the blogs after:', blogsAtEnd)
  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogtoDelete.id))
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})