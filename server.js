// import express
const express = require('express')

// import path
const path = require('path')

// initialization of server
const app = express()

// create PORT
const PORT = 3000

// createPath function
const createPath = (page) =>
  path.resolve(__dirname, 'html-views', `${page}.html`)

// main route
app.get('/', (request, response) => {
  response.sendFile(createPath('index'))
})

// posts route
app.get('/posts', (request, response) => {
  response.sendFile(createPath('posts'))
})

// post route
app.get('/posts/id:', (request, response) => {
  response.sendFile(createPath('post'))
})

// add post route
app.get('/add-post', (request, response) => {
  response.sendFile(createPath('add-post'))
})

// error midleware
app.use((request, response) => {
  response.status(404).sendFile(createPath('error'))
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
