/**
 * @author lihh
 * @description 设置互殴去
 */

module.exports = function permsToString(mode, isDir) {
  const dir = isDir ? 'd' : '-'
  mode = mode.toString(8)

  return (
    dir +
    mode
      .slice(-3)
      .split('')
      .map(
        (n) =>
          ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'][
            parseInt(n, 10)
          ]
      )
      .join('')
  )
}
