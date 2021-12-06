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
  response.send('Hello World')
})

// start server
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
