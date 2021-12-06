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
  response.render(createPath('index'))
})

// posts route
app.get('/posts', (request, response) => {
  response.render(createPath('posts'))
})

// post route
app.get('/posts/:id', (request, response) => {
  response.render(createPath('post'))
})

// add post route
app.get('/add-post', (request, response) => {
  response.render(createPath('add-post'))
})

// error midleware
app.use((request, response) => {
  response.status(404).render(createPath('error'))
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
