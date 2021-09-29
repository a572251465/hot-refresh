const fs = require('fs')
const path = require('path')
const { editWatchFile } = require('./singleCase')

const extractRegExp = /(<link.+?>)|(<script.+?>)/gi

/**
 * @author lihh
 * @description 抽离监听的文件
 * @param {*} url 待抽离的文件地址
 */
const extractWatchFile = (filePath) => {
  // 判断是否是htm后缀
  if (!filePath.endsWith('html')) return false
  const currentDir = path.dirname(filePath)

  const fileContent = fs.readFileSync(filePath)
  const matchResult = []
  const watchFile = []
  let result
  // 循环匹配所有的文件 link script
  while ((result = extractRegExp.exec(fileContent)) != null) {
    matchResult.push(result[0])
  }
  if (matchResult.length === 0) return false

  let res = null
  const replaceChar = /\"|\'/gi
  // 循环抽离监听文件的路径
  matchResult.forEach((str) => {
    res = /(href.+?css)/gi.exec(str)
    if (res) {
      watchFile.push(res[0].split('=')[1].replace(replaceChar, ''))
    }
    res = /(src.+?js)/gi.exec(str)
    if (res) {
      watchFile.push(res[0].split('=')[1].replace(replaceChar, ''))
    }
  })

  const allFiles = watchFile
    .map((item) => path.resolve(currentDir, item))
    .concat(filePath)
  editWatchFile(filePath, allFiles)
  console.log(allFiles)
  return true
}

module.exports = extractWatchFile
