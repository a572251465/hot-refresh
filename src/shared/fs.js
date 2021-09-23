const fs = require('fs')

const isFileExists = (filePath) => {
  try {
    const stats = fs.statSync(filePath)
    return !stats.isDirectory()
  } catch (e) {
    return false
  }
}

const isDirExists = (dirPath) => {
  try {
    const stats = fs.statSync(dirPath)
    return !stats.isFile()
  } catch (e) {
    return false
  }
}

module.exports = {
  isFileExists,
  isDirExists
}
