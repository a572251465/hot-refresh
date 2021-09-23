/**
 * @author lihh
 * @description 统一设置颜色
 * @type {chalk.Chalk | chalk.ChalkFunction | {supportsColor: chalk.ColorSupport | false, Level: chalk.Level, Color: Color, ForegroundColor: ForegroundColor, BackgroundColor: BackgroundColor, Modifiers: Modifiers, stderr: chalk.Chalk & {supportsColor: chalk.ColorSupport | false}} | chalk}
 */
const chalk = require('chalk')

const white = (con) => chalk.white(con)
const yellow = (con) => chalk.yellowBright(con)
const cyan = (con) => chalk.cyan(con)
const green = (con) => chalk.green(con)

module.exports = {
  white,
  yellow,
  cyan,
  green
}
