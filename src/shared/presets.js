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
    isBoolean: false,
    desc: 'Port number to start the service'
  },
  {
    alias: '-d',
    allName: '--dir',
    field: 'dir',
    isBoolean: false,
    defaultValue: process.cwd(),
    desc: 'Service startup directory'
  },
  {
    alias: '-t',
    allName: '--time',
    field: 'time',
    isBoolean: false,
    defaultValue: 0,
    desc: 'Save file refresh page jitter time'
  },
  {
    alias: '-l',
    allName: '--log',
    field: 'log',
    isBoolean: true,
    defaultValue: false,
    desc: 'Print error log'
  },
  {
    alias: '-s',
    allName: '--statics',
    field: 'statics',
    isBoolean: true,
    defaultValue: false,
    desc: 'Start only static services'
  },
  {
    alias: '-c',
    allName: '--cache',
    field: 'cache',
    isBoolean: true,
    defaultValue: true,
    desc: 'Start static file caching'
  }
]

module.exports = defaultPresetConfig
