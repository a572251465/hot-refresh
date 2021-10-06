const path = require('path')
const fs = require('fs')
const { isDirExists, getAllDir } = require('./fs')
const logWrite = require('./logWrite')
const { singleCase } = require('./singleCase')
const { getCurrentDate } = require('./utils')

/**
 * @author lihh
 * @description 建立本地文件缓存 -- 目的是同一个目录下 不能存在两个服务
 * @param cwd 表示命令运行目录下
 */
const localCached = (cwd) => {
  // 当前年月日
  const _ = getCurrentDate()
  // node 执行目录
  let { execPath } = process
  execPath = path.dirname(execPath)
  const newPath = path.join(execPath, _)

  // 判断目录是否存在
  if (isDirExists(newPath)) {
    const fileContent = fs.readFileSync(
      path.join(newPath, 'hot-refresh.txt'),
      'utf-8'
    )
    if (fileContent.includes(cwd)) {
      return false
    }
  }

  // 创建目录
  if (!isDirExists(newPath)) {
    fs.mkdirSync(newPath)
  }

  // 循环写入内容
  const dirList = getAllDir(cwd)
  if (dirList.length > 0) {
    singleCase.dirList = dirList
  }
  dirList.forEach((item) => {
    logWrite(path.join(newPath, 'hot-refresh.txt'), item)
  })
  return true
}
module.exports = localCached
