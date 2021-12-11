// import multer
const multer = require('multer')

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

module.exports = upload
