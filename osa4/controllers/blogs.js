const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!blog.hasOwnProperty('likes')){
      blog.likes = 0
    }
    if(blog.title === undefined  || blog.url === undefined){
      
      response.status(400).json('bad request')
    }else {
      const savedBlog = await blog.save()
      
      response.status(201).json(savedBlog.toJSON())
      
    }
    
})

blogRouter.delete('/:id', async (request,response, next) => {
  try{
    await Blog.findByIdAndRemove(request.body.id)
    response.status(204).end()
    
  } catch (exception){
    next(exception)
  }
})
module.exports = blogRouter