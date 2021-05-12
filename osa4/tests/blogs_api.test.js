const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})
test('get returns 3 blogs as Json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(initialBlogs.length)
})
test('get returns components which have field id', async () => {
    const response = await api
    .get('/api/blogs')
    response.body.forEach(r => expect(r.id).toBeDefined())
    
})
test('A valid blog can be added', async () => {
    const blog ={
        title: "test",
        author: "testAuthor",
        url: "Blog/Test",
        likes: 10,
    }

    await api 
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    const authors = response.body.map(r => r.author)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(authors).toContain(
        'testAuthor'
    )
})
test('null likes field sets likes to 0', async () => {
  const blog ={
    title: "test",
    author: "testAuthor",
    url: "Blog/Test"
  }

await api 
.post('/api/blogs')
.send(blog)
.expect(201)
.expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')
const b = response.body.filter(r => r.author === "testAuthor")
const likes = b.map(r => r.likes)
expect(likes).toContain(0)
})

test('null url and title rerturns 400 bad request', async () => {
  const blog ={
    author: "testAuthor",
    likes: 2
  }

await api 
.post('/api/blogs')
.send(blog)
.expect(400)
.expect('Content-Type', /application\/json/)
})
afterAll(() => {
  mongoose.connection.close()
})


