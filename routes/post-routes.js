// import express
const express = require('express')
// import Post model
const Post = require('../models/post')
// create router
const router = express.Router()

// post route
router.get('/posts', (request, response) => {
  const title = 'Posts'

  Post.find()
    .then((posts) => response.render(createPath('posts'), { posts, title }))
    .catch((error) => response.render(createPath('error'), { title: 'Error' }))
})

// post route
router.get('/posts/:id', (request, response) => {
  const title = 'Post'

  Post.findById(request.params.id)
    .then((post) => response.render(createPath('post'), { post, title }))
    .catch((error) => response.render(createPath('error'), { title: 'Error' }))
})

// delete post
router.delete('/posts/:id', (request, response) => {
  const title = 'Post'

  Post.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.sendStatus(200)

      fs.unlink(`./assets/images/${result.image}`, (error) => {
        if (error) {
          console.log(error)
        }
      })
    })
    .catch((error) => response.render(createPath('error'), { title }))
})

// add post route
router.get('/add-post', (request, response) => {
  const title = 'Add post'
  response.render(createPath('add-post'), { title })
})

// add post route, method post
router.post('/add-post', upload.single('image'), (request, response) => {
  const { title, text, subject } = request.body

  const post = new Post({
    title,
    text,
    subject,
    image: request.file.filename,
  })

  post
    .save()
    .then((result) => response.redirect('/posts'))
    .catch((error) => response.render(createPath('error'), { title: 'Error' }))
})

module.exports = router
