/**
 * @author lihh
 * @description cli执行开始页面
 */
const { program } = require('commander')
const merge = require('single-merge')

const getVersionInfo = require('../shared/verison')
const defaultPresetConfig = require('../shared/presets')
const Server = require('../shared/server')

const commanderHandle = () => {
  // -- 默认值
  const defaultOptions = defaultPresetConfig.reduce((pre, cur) => {
    const { field, defaultValue } = cur
    pre[field] = defaultValue
    return pre
  }, {})

  program.version(getVersionInfo('version'))
  defaultPresetConfig.forEach((item) => {
    const { alias, allName, field, desc } = item
    program.option(`${alias}, ${allName} <${field}>`, desc)
  })
  program.parse(process.argv)
  const autoOptions = program.opts()
  return merge(defaultOptions, autoOptions)
}

const cli = () => {
  const options = commanderHandle()
  const server = new Server(options)
  server.start()
}

module.exports = cli
