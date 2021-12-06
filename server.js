// import express
const express = require('express')

// initialization of server
const app = express()

// create PORT
const PORT = 3000

// main route
app.get('/', (request, response) => {})

// posts route
app.get('/posts', (request, response) => {})

// post route
app.get('/posts/id:', (request, response) => {})

// error midleware
app.use((request, response) => {})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
