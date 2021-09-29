module.exports = `
// 进行webSocket 连接
const ws = new WebSocket("ws://localhost:{{port}}")

// 实现open监听
ws.onopen = () =>{
  ws.send({
    url: window.location.href,
    message: '连接成功'
  })
}

// 实现消息监听
ws.onmessage = () => {
  window.location.reload()
  ws.send({
    url: window.location.href,
    message: '刷新成功'
  })
}
`
