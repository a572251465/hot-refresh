const fs = require('fs')
const path = require('path')
const fsUtil = require('./fs')
const { getCurrentDate } = require('./utils')
const { singleCase } = require('./singleCase')
const { suffix } = require('./utils')

/**
 * @author lihh
 * @description 清除缓存文件目录
 */
const clearDirList = () => {
  const { dirList } = singleCase
  const _ = getCurrentDate()
  let { execPath } = process
  execPath = path.dirname(execPath)
  const newPath = path.join(execPath, _)

  // 判断目录是否存在
  if (!fsUtil.isDirExists(newPath)) {
    return false
  }

  // 读取文件内容
  const fileDir = path.join(newPath, 'hot-refresh.txt')
  let content = fs.readFileSync(fileDir, 'utf-8')
  dirList.forEach((item) => {
    content = content.replace(`${item}${suffix}`, '')
  })
  fs.writeFileSync(fileDir, content)
  return true
}

/**
 * @author lihh
 * @description 删除写入的log
 */
const clearWriteLog = () => {
  const { logName } = singleCase
  if (!fsUtil.isFileExists(logName)) return false

  fs.unlinkSync(logName)
  singleCase.logName = ''
  return true
}

/**
 * @author lihh
 * @description 清除单例信息
 */
const clearSingleInfo = () => {
  Object.keys(singleCase).forEach((key) => {
    const value = singleCase[key]
    singleCase[key] = Array.isArray(value) ? [] : {}
  })
}

/**
 * @author lihh
 * @description 退出清除文件缓存
 */
const clearWatcher = () => {
  const { watchInstance } = singleCase
  watchInstance.forEach((item) => {
    const { files, instance } = item
    files.forEach(async (filename) => {
      await instance.unwatch(filename)
    })
  })

  singleCase.watchInstance = []
}

/**
 * @author lihh
 * @description 清除html中socket文件
 */
const clearHtmlSocketInfo = () => {
  const { watchFile, allSocketNames, preset } = singleCase
  // 循环清除html中js引用
  Object.keys(watchFile).forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8')
    allSocketNames.forEach((name) => {
      if (content.indexOf(name) !== -1) {
        fs.writeFileSync(filePath, content.replace(name, ''), 'utf8')
      }
    })
  })

  const filepath = path.join(preset.dir, 'hot-refresh-socket.js')
  if (fsUtil.isFileExists(filepath)) {
    // 删除js文件
    fs.unlinkSync(filepath)
  }
}

/**
 * @author lihh
 * @description 退出时清除缓存
 */
const exitClearCache = () => {
  const { statics } = singleCase.preset
  if (statics) return false

  clearDirList()
  clearWriteLog()
  clearWatcher()
  clearHtmlSocketInfo()
  clearSingleInfo()
  return true
}

module.exports = exitClearCache
