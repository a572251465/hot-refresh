const singleCase = {
  preset: {}
}

const setPresetOptions = (options) => {
  singleCase.preset = {}
  Reflect.ownKeys(options).forEach((key) => {
    singleCase.preset[key] = options[key]
  })
}

module.exports = {
  singleCase,
  setPresetOptions
}
