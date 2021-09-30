const chokidar = require('chokidar')
const { singleCase } = require('./singleCase')
const server = require('./serverSocket')

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
    unlinkFiles.forEach((filename) => {
      watchInstance.forEach(async (item, key) => {
        const { files, instance } = item
        if (files.includes(filename)) {
          await instance.unwatch(filename)
          const localIndex = files.findIndex(filename)
          watchInstance[key].files.splice(localIndex, 1)
          if (watchInstance[key].files.length === 0) {
            watchInstance.splice(key, 1)
          }
        }
      })
    })
  }

  // 2. 监听文件
  if (watchFiles.length > 0) {
    const watcher = chokidar.watch(watchFiles)
    watcher.on('change', (path) => {
      if (path.endsWith('.html')) {
        extractWatchFile(path)
      }
      console.log(path, 'path--------')
      server.sendMessage()
    })

    // 添加依赖
    singleCase.watchInstance.push({
      files: watchFiles,
      instance: watcher
    })
  }
}

module.exports = watchFilesExec
