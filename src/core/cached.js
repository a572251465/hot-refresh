const crypto = require('crypto')

/**
 * @author lihh
 * @description 设置静态文件的缓存
 */

const cached = (res, req, stat) => {
  const { size, ctime } = stat
  // 强制缓存
  res.setHeader('Cache-Control', 'max-age=10')
  res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())

  // 协商缓存
  const etag = crypto.createHash('md5').update(String(size)).digest('base64')
  res.setHeader('Etag', etag)
  res.setHeader('Last-Modified', ctime.toGMTString())

  const preEtag = req.headers['if-none-match']
  const preLastModified = req.headers['if-modified-since']

  if (etag !== preEtag) return false
  if (ctime !== preLastModified) return false
  return true
}

module.exports = cached
