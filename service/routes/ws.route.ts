import { WebSocketServer } from 'ws'
import { type Server } from 'http'
import { notificationEvents } from '../events'

const websocketProxy = (httpServer: Server) => {
  const wss = new WebSocketServer({ noServer: true })

  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected')
    ws.send(JSON.stringify({ type: 'notification', message: 'Welcome back!' }))
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString())
      if (message.type === 'subscribe') {
        const groupId = message.groupId
        const userId = message.userId
        if (userId) {
          notificationEvents.on(`user:${userId}`, (message) => {
            ws.send(JSON.stringify({ type: 'notification', message }))
          })
        }
        if (groupId) {
          notificationEvents.on(`group:${groupId}`, (message) => {
            ws.send(JSON.stringify({ type: 'notification', message }))
          })
        }
      }
    })

    ws.on('close', () => {
      console.log('WebSocket client disconnected')
    })
  })
}

export default websocketProxy
