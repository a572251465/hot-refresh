const singleCase = {
  preset: {},
  watchFile: {},
  allSocketNames: [],
  watchInstance: [],
  server: null,
  logName: ''
}

const setPresetOptions = (options) => {
  singleCase.preset = {}
  Reflect.ownKeys(options).forEach((key) => {
    singleCase.preset[key] = options[key]
  })
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
  setSocketName
}
