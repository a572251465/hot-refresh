const http = require('http')
const getIpInfo = require('./ip')
const colors = require('./colors')
const routeController = require('../core/route')

class Server {
  constructor(options) {
    const { port, dir } = options
    this.port = port
    this.dir = dir
  }

  start() {
    const route = routeController({ port: this.port, dir: this.dir })
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
      console.log(colors.cyan('File change watch ...'))
      console.log(colors.white('Hit CTRL-C to stop the server'))
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
