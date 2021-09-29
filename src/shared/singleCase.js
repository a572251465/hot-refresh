const singleCase = {
  preset: {},
  watchFile: {}
}

const setPresetOptions = (options) => {
  singleCase.preset = {}
  Reflect.ownKeys(options).forEach((key) => {
    singleCase.preset[key] = options[key]
  })
}

/**
 * @author lihh
 * @description 获取 / 编辑监听的文件
 * @param {*} key 表示监听的html
 * @param {*} value html下的所有可能改变的文件
 * @returns
 */
const editWatchFile = (key, value) => {
  if (typeof value === 'undefined') return singleCase.watchFile[key]
  singleCase.watchFile[key] = value
  return true
}

module.exports = {
  singleCase,
  setPresetOptions,
  editWatchFile
}
