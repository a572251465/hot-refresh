const chokidar = require('chokidar')
const { singleCase } = require('./singleCase')
const { debug } = require('./logModule')

/**
 * @author lihh
 * @description 监听执行文件
 * @param {*} watchFiles
 * @param {*} unlinkFiles
 */
const watchFilesExec = (watchFiles = [], unlinkFiles = []) => {
  const extractWatchFile = require('./extractWatchFile')

  // 1. 首先解除监听
  if (unlinkFiles.length > 0) {
    const { watchInstance } = singleCase
    const unDelFiles = []
    unlinkFiles.forEach((filename) => {
      watchInstance.forEach(async (item, key) => {
        const { files, instance } = item
        if (files.includes(filename)) {
          await instance.unwatch(filename)
          unDelFiles.push(filename)
          const localIndex = files.findIndex(filename)
          watchInstance[key].files.splice(localIndex, 1)
          if (watchInstance[key].files.length === 0) {
            watchInstance.splice(key, 1)
          }
        }
      })
    })

    // 解除监听debug提示
    if (unDelFiles.length > 0) {
      debug(
        unDelFiles.map((filename) => `file<${filename}> be watch unmount`),
        'add'
      )
    }
  }

  // 2. 监听文件
  if (watchFiles.length > 0) {
    debug(
      watchFiles.map((filename) => `file<${filename}> change watch...`),
      'add'
    )

    const watcher = chokidar.watch(watchFiles)

    watcher.on('change', (path) => {
      debug(`file<${path}> Something has changed`, 'change')
      if (path.endsWith('.html')) {
        extractWatchFile(path)
      }
      singleCase.server.send()
    })

    // 添加依赖
    singleCase.watchInstance.push({
      files: watchFiles,
      instance: watcher
    })
  }
}

module.exports = watchFilesExec
