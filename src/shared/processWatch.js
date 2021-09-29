const exitClearCache = require('./exitClearCache')

/**
 * @author lihh
 * @description 开启进程监听
 */
const processWatch = () => {
  process.on('SIGINT', () => {
    exitClearCache()
    process.exit(0)
  })

  process.on('SIGHUP', () => {
    exitClearCache()
    process.exit(0)
  })
}

module.exports = processWatch
