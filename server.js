// import express
const express = require('express')

// import path
const path = require('path')

// імпорт morgan
const morgan = require('morgan')

// import multer
const multer = require('multer')

// import fs
const fs = require('fs')

// import mongoose
const mongoose = require('mongoose')

// import post-routes
const postRoutes = require('./routes/post-routes')

// initialization of server
const app = express()

// initialization of ejs
app.set('view engine', 'ejs')

// create PORT
const PORT = 3000

// create db
const db =
  'mongodb+srv://DidykS:ckfdsr.hfy2201@cluster0.fjydt.mongodb.net/appPost?retryWrites=true&w=majority'

// conntect with mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resolve) => console.log('Connected to DB'))
  .catch((error) => console.log(error))

// work with multer
const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, './assets/images')
  },
  filename(request, file, callback) {
    callback(null, Date.now() + '-' + file.originalname)
  },
})
// validate images
const types = ['image/png', 'image/jpeg', 'image/jpg']
const fileFilter = (request, file, callback) => {
  if (types.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
})

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
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
