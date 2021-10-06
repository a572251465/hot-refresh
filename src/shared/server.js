const http = require('http')
const path = require('path')
const getIpInfo = require('./ip')
const colors = require('./colors')
const routeController = require('../core/route')
const processWatch = require('./processWatch')
const { setPresetOptions, singleCase } = require('./singleCase')
const generatorClientSocket = require('./generatorClientSocket')
const ServerSocket = require('./serverSocket')
const localCached = require('./localCached')

class Server {
  constructor(options) {
    const { port, dir, statics, logWrite } = options
    this.port = port
    this.dir = dir
    this.statics = statics
    this.logWrite = logWrite
    setPresetOptions(options)
  }

  start() {
    const route = routeController()
    const server = http.createServer((req, res) => route(req, res))
    server.listen(this.port, () => {
      // 建立本地文件缓存
      const status = localCached(this.dir)
      if (!status) {
        console.log(colors.red('A service is already starting'))
        process.exit(1)
      }

      console.log(
        colors.green(
          `hot-refresh 开源不易，请拿起你们的小手，点击star吧 <https://github.com/a572251465/hot-refresh>`
        )
      )
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
        singleCase.server = new ServerSocket(server)
      }

      // 判断是否将log写入文件中
      if (this.logWrite) {
        const logName = path.join(this.dir, `${+new Date()}_log.txt`)
        singleCase.logName = logName
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
