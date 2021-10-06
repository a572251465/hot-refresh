const os = require('os')

// 获取系统类别
const type = os.type().toLowerCase()
const suffix = type.includes('window')
  ? '\r\n'
  : type.includes('linux')
  ? '\n'
  : '\r'

/**
 * @author lihh
 * @description 获取当前日期
 */
const getCurrentDate = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  // 当前年月日
  const _ = `${year}${month}${day}`
  return _
}

module.exports = {
  getCurrentDate,
  suffix
}
