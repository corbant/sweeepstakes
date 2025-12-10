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
    const passMessage = (message: string) => {
      ws.send(JSON.stringify({ type: 'notification', message }))
    }
    console.log('WebSocket client connected')
    ws.send(JSON.stringify({ type: 'notification', message: 'Welcome back!' }))
    let groupId: string
    let userId: string
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString())
      if (message.type === 'subscribe') {
        groupId = message.groupId
        userId = message.userId
        if (userId) {
          notificationEvents.on(`user:${userId}`, passMessage)
        }
        if (groupId) {
          notificationEvents.on(`group:${groupId}`, passMessage)
        }
      }
    })

    ws.on('close', () => {
      if (userId) {
        notificationEvents.off(`user:${userId}`, passMessage)
      }
      if (groupId) {
        notificationEvents.off(`group:${groupId}`, passMessage)
      }
      console.log('WebSocket client disconnected')
    })
  })
}

export default websocketProxy
