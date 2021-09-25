const path = require('path')
const ejs = require('ejs')
const url = require('url')
const { createReadStream } = require('fs')
const fs = require('fs')
const fsUtil = require('../shared/fs')
const colors = require('../shared/colors')

const dirListTemplatePath = path.resolve(
  __dirname,
  '../template/dir-list-template.html'
)
const dirListTemplate = fs.readFileSync(dirListTemplatePath, 'utf-8')

/**
 * @author lihh
 * @description 进行路由控制
 */

// eslint-disable-next-line no-shadow
const generatorDirPage = async (dir, pathname) => {
  // eslint-disable-next-line no-shadow
  const url = path.join(dir, pathname)
  const dirs = fs.readdirSync(url)
  const resDirs = dirs.map((filename) => {
    const filePath = path.join(url, filename)
    const stats = fs.statSync(filePath)
    const { size } = stats
    const type = stats.isFile() ? '1' : '2'
    return {
      filename,
      size: size < 1000 ? `${size}B` : `${(size / 1000).toFixed(1)}K`,
      power: '-rw-rw-rw-',
      url: path.join(pathname, filename),
      type
    }
  })
  const fileContent = await ejs.render(dirListTemplate, {
    dirs: resDirs
  })
  return fileContent
}

const pageNextHandle = async (req, res, dir) => {
  const { pathname } = url.parse(req.url)
  try {
    if (pathname === '/') {
      const absPath = path.join(dir, 'index.html')
      if (fsUtil.isFileExists(absPath)) {
        createReadStream(absPath).pipe(res)
      } else {
        const result = await generatorDirPage(dir, pathname)
        res.end(result)
      }
    } else {
      const absPath = path.join(dir, pathname)
      const stats = fs.statSync(absPath)
      if (stats.isFile()) {
        createReadStream(absPath).pipe(res)
      } else {
        const result = await generatorDirPage(dir, pathname)
        res.end(result)
      }
    }
  } catch (e) {
    console.log(colors.red(`${pathname} is not found`))
    res.end('not found')
  }
}

const route = (options) => (req, res) => {
  const { dir } = options
  pageNextHandle(req, res, dir)
}

module.exports = route
