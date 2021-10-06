const colors = require('./colors')
const { singleCase } = require('./singleCase')
const logWrite = require('./logWrite')

/**
 * @author lihh
 * @description 进行debug打印日志
 * @param content 表示打印的内容
 * @param type 表示打印的方法
 */
const debug = (content, type = 'refresh') => {
  const { preset } = singleCase
  if (preset.statics) return false
  if (!['add', 'delete', 'change', 'refresh'].includes(type)) return false

  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 表示时间
  const printTime = `*** print log time: ${year}-${month}-${day}  ${hour}:${minute}:${seconds} ***`

  // 格式化为数组数据
  const loopContent = Array.isArray(content) ? content : [content]
  const formatArr = loopContent.map(() => ({
    prefix: `*** ${type}`,
    suffix: ` ***`
  }))
  const printInfo = loopContent.map((item, key) => {
    const { prefix, suffix } = formatArr[key]
    return `${colors.yellow(prefix)} ${colors.cyan(item)}${colors.yellow(
      suffix
    )}`
  })
  const printInfoNoColors = loopContent.map((item, key) => {
    const { prefix, suffix } = formatArr[key]
    return `${prefix} ${item}${suffix}`
  })

  if (!singleCase.preset.logWrite) {
    console.log(colors.yellow(printTime))
    printInfo.forEach((info) => console.log(info))
  } else {
    const { logName } = singleCase
    logWrite(logName, printTime)
    printInfoNoColors.forEach((info) => logWrite(logName, info))
  }

  return true
}

module.exports = {
  debug
}
