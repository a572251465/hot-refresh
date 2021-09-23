const path = require('path')

const packageJson = require(path.resolve(__dirname, '../../package.json'))

/**
 * @author lihh
 * @description 获取package配置信息
 * @param key 通过key来获取
 */
const getVersionInfo = (key) => packageJson[key]

module.exports = getVersionInfo
