const fs = require('fs')
const path = require('path')
const { singleCase, setSocketName } = require('./singleCase')

/**
 * @author lihh
 * @description 客户端html 写入webSocket
 * @param {string} filePath html文件地址
 */
const clientHtmlWriteSocket = (filePath) => {
  if (!filePath.endsWith('.html')) return false

  // 判断是否已经存在socket文件
  let content = fs.readFileSync(filePath, 'utf8')
  if (content.includes('hot-refresh-socket.js')) return false

  // 获取对应的插入下标
  const expArr = [/<\s*\/\s*body\s*>/gi, /<\s*\/\s*head\s*>/gi]
  let localIndex = -1
  for (let i = 0; i < expArr.length; i += 1) {
    const resArr = expArr[i].exec(content)
    if (resArr) {
      localIndex = resArr.index
      break
    }
  }
  if (!localIndex || localIndex === -1) return false

  // 计算socket.js相对目录
  const { dir } = singleCase.preset
  const diffPath = path.relative(dir, path.dirname(filePath))
  const relativePath = path.join(
    diffPath ? diffPath.replace(/[a-zA-Z0-9\u4E00-\u9FA5]+/gi, '..') : '',
    'hot-refresh-socket.js'
  )

  // 生成插入字符串 写入文件
  const installCode = `<script type="text/javascript" src="${relativePath}"></script>`
  setSocketName(installCode)
  content =
    content.slice(0, localIndex) + installCode + content.slice(localIndex)
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8'
  })
  return true
}

module.exports = clientHtmlWriteSocket
