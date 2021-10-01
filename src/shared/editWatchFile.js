const { singleCase } = require('./singleCase')
const watchFilesExec = require('./watch')

/**
 * @author lihh
 * @description 获取 / 编辑监听的文件
 * @param {*} key 表示监听的html
 * @param {*} value html下的所有可能改变的文件
 * @returns
 */
const editWatchFile = (key, value) => {
  if (typeof value === 'undefined') return singleCase.watchFile[key]
  if (Array.isArray(value) && value.length === 0) return false

  let dispatchFiles = []
  const unlinkFiles = []
  const preValue = singleCase.watchFile[key]
    ? Object.assign([], singleCase.watchFile[key])
    : singleCase.watchFile[key]

  // 判断缓存文件是否存在
  if (!Reflect.has(singleCase.watchFile, key)) {
    singleCase.watchFile[key] = value
    dispatchFiles = [].concat(value)
  } else {
    const existFiles = singleCase.watchFile[key]
    value.forEach((filename) => {
      // 筛选没有监听的文件
      if (!existFiles.includes(filename)) {
        existFiles.push(filename)
        dispatchFiles.push(filename)
      }
    })
  }

  // 筛选需要解除监听的文件
  if (Array.isArray(preValue) && preValue.length > 0 && value.length > 0) {
    preValue.forEach((filename) => {
      if (!value.includes(filename)) {
        unlinkFiles.push(filename)
      }
    })
  }

  if (dispatchFiles.length === 0 && unlinkFiles.length === 0) return false

  // 开始进行文件的监听
  watchFilesExec(dispatchFiles, unlinkFiles)
  return true
}

module.exports = editWatchFile
