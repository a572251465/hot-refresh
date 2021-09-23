const path = require('path')
const { createReadStream } = require('fs')
const fsUtil = require('../shared/fs')

/**
 * @author lihh
 * @description 进行路由控制
 */

const pageNextHandle = (req, res, dir) => {
  if (req.url === '/') {
    const absPath = path.join(dir, 'index.html')
    if (fsUtil.isFileExists(absPath)) {
      createReadStream(absPath).pipe(res)
    }
  }
}

const route = (options) => (req, res) => {
  const { dir } = options
  pageNextHandle(req, res, dir)
}

module.exports = route
