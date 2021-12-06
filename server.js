// import express
const express = require('express')

// import path
const path = require('path')

// імпорт morgan
const morgan = require('morgan')

// initialization of server
const app = express()

// initialization of ejs
app.set('view engine', 'ejs')

// create PORT
const PORT = 3000

// createPath function
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

// middlewares
// middleware for styles
app.use(express.static(__dirname))

// morgan logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// main route
app.get('/', (request, response) => {
  const title = 'Home'

  response.render(createPath('index'), { title })
})

// posts route
app.get('/posts', (request, response) => {
  const title = 'Posts'

  response.render(createPath('posts'), { title })
})

// post route
app.get('/posts/:id', (request, response) => {
  const title = 'Post'

  response.render(createPath('post'), { title })
})

// add post route
app.get('/add-post', (request, response) => {
  const title = 'Add post'
  response.render(createPath('add-post'), { title })
})

// error midleware
app.use((request, response) => {
  const title = 'Error'

  response.status(404).render(createPath('error'), { title })
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
