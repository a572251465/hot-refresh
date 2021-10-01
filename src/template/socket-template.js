module.exports = `
// 进行webSocket 连接
const ws = new WebSocket("ws://localhost:{{port}}")

// 实现消息监听
ws.onmessage = (data) => {
  ws.send(window.location.href)
  window.location.reload()
}
`
