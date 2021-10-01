const fs = require('fs')
const os = require('os')
const { singleCase } = require('./singleCase')

// 获取系统类别
const type = os.type().toLowerCase()
const suffix = type.includes('window')
  ? '\r\n'
  : type.includes('linux')
  ? '\n'
  : '\r'

/**
 * @author lihh
 * @description 对log进行文件写入
 * @param {*} content
 */
const logWrite = (content) => {
  const { logName } = singleCase
  fs.appendFileSync(logName, `${content}${suffix}`)
}

module.exports = logWrite
