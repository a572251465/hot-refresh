const { WebSocketServer } = require('ws')
const url = require('url')
const path = require('path')
const { debug } = require('./logModule')
const { singleCase } = require('./singleCase')

class ServerSocket {
  constructor(server) {
    this.start(server)
  }

  send() {
    this.ws.send('browser reload')
  }

  start(server) {
    const wss = new WebSocketServer({ server })

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        let { pathname } = url.parse(message.toString())
        pathname = decodeURIComponent(pathname)
        debug(
          `file<${path.join(
            singleCase.preset.dir,
            pathname
          )}> refresh successful`
        )
      })

      this.ws = ws
    })
  }
}

module.exports = ServerSocket
