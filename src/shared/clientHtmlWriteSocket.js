const fs = require('fs')
const path = require('path')
const { singleCase } = require('./singleCase')

/**
 * @author lihh
 * @description 客户端html 写入webSocket
 * @param {string} filePath html文件地址
 */
const clientHtmlWriteSocket = (filePath) => {
  if (!filePath.endsWith('.html')) return false

  let content = fs.readFileSync(filePath, 'utf8')
  if (content.includes('hot-refresh-socket.js')) return false

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

  const { dir } = singleCase.preset
  const relativePath = path.join(
    path.relative(dir, path.dirname(filePath)),
    'hot-refresh-socket.js'
  )
  const installCode = `<script type="text/javascript" src="${relativePath}"></script>`
  content =
    content.slice(0, localIndex) + installCode + content.slice(localIndex)
  fs.writeFileSync(filePath, content, {
    encoding: 'utf8'
  })
  return true
}

module.exports = clientHtmlWriteSocket
