const http = require('http')
const getIpInfo = require('./ip')
const colors = require('./colors')
const routeController = require('../core/route')
const processWatch = require('./processWatch')
const { setPresetOptions } = require('./singleCase')
const generatorClientSocket = require('./generatorClientSocket')
const serverSocket = require('./serverSocket')

class Server {
  constructor(options) {
    const { port, dir, statics } = options
    this.port = port
    this.dir = dir
    this.statics = statics
    setPresetOptions(options)
  }

  start() {
    const route = routeController()
    const server = http.createServer((req, res) => route(req, res))
    server.listen(this.port, () => {
      console.log(
        colors.yellow(
          `Service started successfully, the address is: ${this.dir}`
        )
      )
      const ips = getIpInfo().concat('localhost')
      ips.forEach((ip) => {
        console.log(
          `${colors.white(`http://${ip}:`)}${colors.green(this.port)}`
        )
      })
      if (!this.statics) {
        console.log(colors.cyan('File change watch ...'))
        generatorClientSocket()

        // 开启webSocket
        serverSocket(server)
      }
      console.log(colors.white('Hit CTRL-C to stop the server'))
      processWatch()
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        this.port = +this.port + 1
        server.listen(this.port)
      }
    })
  }
}

module.exports = Server
