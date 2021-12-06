// import express
const express = require('express')

// initialization of server
const app = express()

// create PORT
const PORT = 3000

// main route
app.get('/', (request, response) => {
  response.send('Hello Worlds')
})

// posts route
app.get('/posts', (request, response) => {
  response.send('Posts page')
})

// post route
app.get('/posts/id:', (request, response) => {
  response.send('Post page')
})

// error midleware
app.use((request, response) => {
  response.status(404).send('Error')
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
