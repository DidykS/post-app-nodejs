// import Post model
const Post = require('../models/post')
// import createPath
const createPath = require('../helpers/create-path')
// import fs
const fs = require('fs')

// handleError function
const handleError = (response, error) => {
  response.render(createPath('error'), { title: 'Error' })
}

// get post controller
const getPost = (request, response) => {
  const title = 'Post'

  Post.findById(request.params.id)
    .then((post) => response.render(createPath('post'), { post, title }))
    .catch((error) => handleError(response, error))
}

// delete post controller
const deletePost = (request, response) => {
  Post.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.sendStatus(200)

      fs.unlink(`./assets/images/${result.image}`, (error) => {
        if (error) {
          console.log(error)
        }
      })
    })
    .catch((error) => handleError(response, error))
}

// get posts controller
const getPosts = (request, response) => {
  const title = 'Posts'

  Post.find()
    .then((posts) => response.render(createPath('posts'), { posts, title }))
    .catch((error) => handleError(response, error))
}

// get add-post controller
const getAddPost = (request, response) => {
  const title = 'Add post'
  response.render(createPath('add-post'), { title })
}

// add post controller
const addPost = (request, response) => {
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
    .catch((error) => handleError(response, error))
}

module.exports = {
  getPost,
  deletePost,
  getPosts,
  getAddPost,
  addPost,
}
