// import express
const express = require('express')

// import path
const path = require('path')

// імпорт morgan
const morgan = require('morgan')

// import multer
const multer = require('multer')

// import mongoose
const mongoose = require('mongoose')

// initialization of server
const app = express()

// initialization of ejs
app.set('view engine', 'ejs')

// create PORT
const PORT = 3000

// createPath function
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

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

// posts route
app.get('/posts', (request, response) => {
  const title = 'Posts'
  const posts = [
    {
      id: '1',
      text: 'Тестовий вивід посту з сервера',
      title: 'Як писати код швидко та безболісно?',
      date: '30.11.2021',
      subject: 'створення сайтів',
    },
    {
      id: '2',
      text: 'Тестовий вивід посту з сервера',
      title: 'Як стати NodeJS розробником',
      date: '12.11.2021',
      subject: 'навчання',
    },
  ]

  response.render(createPath('posts'), { title, posts })
})

// post route
app.get('/posts/:id', (request, response) => {
  const title = 'Post'
  const post = {
    id: '1',
    text: 'Тестовий вивід посту з сервера',
    title: 'Як писати код швидко та безболісно?',
    date: '30.11.2021',
    subject: 'створення сайтів',
  }

  response.render(createPath('post'), { title, post })
})

// add post route
app.get('/add-post', (request, response) => {
  const title = 'Add post'
  response.render(createPath('add-post'), { title })
})

// add post route, method post
app.post('/add-post', upload.single('image'), (request, response) => {
  console.log(request.file)
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
