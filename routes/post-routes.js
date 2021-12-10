// import express
const express = require('express')

// import upload
const upload = require('../helpers/upload')

// create router
const router = express.Router()

// import controllers
const {
  getPost,
  deletePost,
  getPosts,
  getAddPost,
  addPost,
} = require('../controllers/post-controller')

// post route
router.get('/posts', getPosts)

// post route
router.get('/posts/:id', getPost)

// delete post
router.delete('/posts/:id', deletePost)

// add post route
router.get('/add-post', getAddPost)

// add post route, method post
router.post('/add-post', upload.single('image'), addPost)

module.exports = router
