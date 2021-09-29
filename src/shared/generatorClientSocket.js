const path = require('path')
const fs = require('fs')
const { singleCase } = require('./singleCase')
const socketTemplate = require('../template/socket-template')

/**
 * @author lihh
 * @description 生成客户端socket服务
 */
const generatorClientSocket = () => {
  const { port, dir } = singleCase.preset
  const template = socketTemplate.replace('{{port}}', port)

  const filePath = path.join(dir, 'hot-refresh-socket.js')
  fs.writeFileSync(filePath, template, {
    encoding: 'utf-8'
  })
}

module.exports = generatorClientSocket
