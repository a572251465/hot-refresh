const { WebSocketServer } = require('ws')

let globalWs = null

/**
 * @author lihh
 * @description 负责发送消息
 */
const sendMessage = () => {
  globalWs.send('browser reload')
}

/**
 * @author lihh
 * @description 创建服务器端webSocket
 * @param {*} server http server
 */
const serverSocket = (server) => {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {})

    globalWs = ws
  })
}

module.exports = serverSocket
module.exports.sendMessage = sendMessage
