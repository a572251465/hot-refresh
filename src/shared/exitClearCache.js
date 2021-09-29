const fs = require('fs')
const path = require('path')
const { singleCase } = require('./singleCase')

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

  // 删除js文件
  fs.unlinkSync(path.join(preset.dir, 'hot-refresh-socket.js'))
}

/**
 * @author lihh
 * @description 退出时清除缓存
 */
const exitClearCache = () => {
  clearHtmlSocketInfo()
  clearSingleInfo()
}

module.exports = exitClearCache