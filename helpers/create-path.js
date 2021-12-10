// import path
const path = require('path')

// createPath function
const createPath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`)

module.exports = createPath
