module.exports = `
// 进行webSocket 连接
const ws = new WebSocket("ws://localhost:{{port}}")

// 实现消息监听
ws.onmessage = (data) => {
  console.log(data)
  ws.send({
    url: window.location.href,
    message: '刷新成功'
  })
  window.location.reload()
}
`
