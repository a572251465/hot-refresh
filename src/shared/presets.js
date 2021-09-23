/**
 * @author lihh
 * @description 默认的commander预设
 * @type {{}}
 */

const defaultPresetConfig = [
  {
    alias: '-p',
    allName: '--port',
    field: 'port',
    defaultValue: '8080',
    desc: 'Port number to start the service'
  },
  {
    alias: '-d',
    allName: '--dir',
    field: 'dir',
    defaultValue: process.cwd(),
    desc: 'Service startup directory'
  },
  {
    alias: '-t',
    allName: '--time',
    field: 'time',
    defaultValue: 0,
    desc: 'Save file refresh page jitter time '
  }
]

module.exports = defaultPresetConfig
