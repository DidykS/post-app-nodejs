// import express
const express = require('express')

// імпорт morgan
const morgan = require('morgan')

// import mongoose
const mongoose = require('mongoose')

// import post-routes
const postRoutes = require('./routes/post-routes')

// import createPath
const createPath = require('./helpers/create-path')

// import dotenv
require('dotenv').config()

// initialization of server
const app = express()

// initialization of ejs
app.set('view engine', 'ejs')

// conntect with mongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resolve) => console.log('Connected to DB'))
  .catch((error) => console.log(error))

// middlewares
// middleware for styles
app.use(express.static(__dirname))

// morgan logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// middleware for work with method POST
app.use(express.urlencoded({ extended: false }))

// main route
app.get('/', (request, response) => {
  const title = 'Home'

  response.render(createPath('index'), { title })
})

// posts routes
app.use(postRoutes)

// error midleware
app.use((request, response) => {
  const title = 'Error'

  response.status(404).render(createPath('error'), { title })
})

// start server
app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
