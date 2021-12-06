// import express
const express = require('express')

// import path
const path = require('path')

// initialization of server
const app = express()

// create PORT
const PORT = 3000

// createPath function
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

// main route
app.get('/', (request, response) => {
  response.send('Hello Worlds')
})

app.get('/posts', (request, response) => {
  response.send('Posts page')
})

app.get('/posts/id:', (request, response) => {
  response.send('Post page')
})

app.use((request, response) => {
  response.status(404).send('Error')
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
