/**
 * @author lihh
 * @description 获取本机的ip信息
 */
const os = require('os')

const getIpInfo = () => {
  const info = os.networkInterfaces()
  const ips = []
  Object.values(info).forEach((item) => {
    item.forEach((ipInfo, key) => {
      if (key === item.length - 1) {
        ips.push(ipInfo.address)
      }
    })
  })
  return ips
}

module.exports = getIpInfo
