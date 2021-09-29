const singleCase = {
  preset: {},
  watchFile: {},
  allSocketNames: []
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

/**
 * @author lihh
 * @description 设置socket文件 方便以后清除
 * @param {*} name
 */
const setSocketName = (name) => {
  const { allSocketNames } = singleCase
  if (allSocketNames.includes(name)) return false

  allSocketNames.push(name)
  return true
}

module.exports = {
  singleCase,
  setPresetOptions,
  editWatchFile,
  setSocketName
}
