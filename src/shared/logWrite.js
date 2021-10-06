const fs = require('fs')

const { suffix } = require('./utils')

/**
 * @author lihh
 * @description 对log进行文件写入
 * @param {*} url 写入的路径
 * @param {*} content 写入的内容
 */
const logWrite = (url, content) => {
  fs.appendFileSync(url, `${content}${suffix}`)
}

module.exports = logWrite
