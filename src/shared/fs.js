const fs = require('fs')
const path = require('path')

const excludeFile = ['node_modules', '.git', '.vscode', '.idea']

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

/**
 * @author lihh
 * @description 获取当前目录下所有的文件夹
 * @param {*} dir 当天目录
 */
const getAllDir = (dir) => {
  const result = []

  // 读取目录
  const readDir = (filename) => {
    result.push(filename)
    const dirList = fs.readdirSync(filename)
    dirList.forEach((item) => {
      const newPath = path.join(filename, item)
      const stats = fs.statSync(newPath)
      if (stats.isDirectory() && !excludeFile.includes(item)) {
        readDir(newPath)
      }
    })
  }
  readDir(dir)
  return result
}

module.exports = {
  isFileExists,
  isDirExists,
  getAllDir
}
