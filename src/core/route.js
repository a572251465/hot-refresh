const path = require('path')
const ejs = require('ejs')
const url = require('url')
const { createReadStream } = require('fs')
const { getType } = require('mime')
const fs = require('fs')
const fsUtil = require('../shared/fs')
const colors = require('../shared/colors')
const getPower = require('../shared/power')
const cached = require('./cached')
const { singleCase } = require('../shared/singleCase')
const extractWatchFile = require('../shared/extractWatchFile')
const clientHtmlWriteSocket = require('../shared/clientHtmlWriteSocket')

const dirListTemplatePath = path.resolve(
  __dirname,
  '../template/dir-list-template.html'
)
const dirListTemplate = fs.readFileSync(dirListTemplatePath, 'utf-8')

/**
 * @author lihh
 * @description 如果是文件夹 生成页面
 * @param {*} dir 当前路径
 * @param {*} pathname 已经选择文件名称
 * @returns
 */
const generatorDirPage = async (dir, pathname) => {
  const dirs = fs.readdirSync(dir)
  const resDirs = dirs.map((filename) => {
    const filePath = path.join(dir, filename)
    const stats = fs.statSync(filePath)
    const { size } = stats
    const type = stats.isFile() ? '1' : '2'
    const reqUrl = encodeURIComponent(path.join(pathname, filename))
    return {
      filename,
      size: size < 1000 ? `${size}B` : `${(size / 1000).toFixed(1)}K`,
      power: getPower(stats.mode, stats.isDirectory()),
      url: reqUrl,
      type
    }
  })
  const fileContent = await ejs.render(dirListTemplate, {
    dirs: resDirs
  })
  return fileContent
}

/**
 * @author lihh
 * @description 设置请求头部
 * @param {*} filePath 文件地址
 * @param {*} res 相应res
 */
const settingHeaderHandle = (filePath, res) => {
  const { statics } = singleCase.preset
  if (!statics) {
    clientHtmlWriteSocket(filePath)
    extractWatchFile(filePath)
  }
  const type = getType(filePath)
  res.setHeader('Content-Type', `${type}; charset=utf-8`)
}

/**
 * @author lihh
 * @description 判断是否文件夹 还是 文件进行对应处理
 * @param {*} dir 目录
 * @param {*} res 响应response
 * @param {*} req 请求request
 * @param {*} filename 文件名称
 * @returns
 */
const isFileOrFolder = async (dir, res, req, filename) => {
  const newDir = path.join(dir, filename)
  let { pathname } = url.parse(req.url)
  pathname = decodeURIComponent(pathname)

  if (fsUtil.isFileExists(newDir)) {
    settingHeaderHandle(newDir, res)
    const stats = fs.statSync(newDir)

    if (singleCase.preset.cache && cached(res, req, stats)) {
      res.statusCode = 304
      return res.end()
    }
    return createReadStream(newDir).pipe(res)
  }
  const result = await generatorDirPage(dir, pathname)
  return res.end(result)
}

/**
 * @author lihh
 * @description 路径控制的主页面
 * @param {*} req 请求request
 * @param {*} res 响应response
 * @param {*} dir 文件目录
 */
// eslint-disable-next-line consistent-return
const pageNextHandle = async (req, res, dir) => {
  let { pathname } = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  try {
    if (pathname === '/') {
      await isFileOrFolder(dir, res, req, 'index.html')
    } else {
      const absPath = path.join(dir, pathname)
      const stats = fs.statSync(absPath)

      if (stats.isFile()) {
        await isFileOrFolder(dir, res, req, pathname)
      } else {
        await isFileOrFolder(absPath, res, req, 'index.html')
      }
    }
  } catch (e) {
    const { log } = singleCase.preset
    if (log) {
      console.log(e)
      console.log(colors.yellow(`${pathname} is not found`))
    }
    res.end('not found')
  }
}

const route = () => (req, res) => {
  const { dir } = singleCase.preset
  pageNextHandle(req, res, dir)
}

module.exports = route
