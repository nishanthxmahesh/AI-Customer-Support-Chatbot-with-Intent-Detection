export function createChatSocket(sessionId, handlers) {
  const wsUrl = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws/chat/${sessionId}`
  let socket
  let retries = 0
  const connect = () => {
    socket = new WebSocket(wsUrl)
    socket.onopen = () => {
      retries = 0
      handlers.onStatus?.('connected')
    }
    socket.onmessage = (event) => handlers.onMessage?.(JSON.parse(event.data))
    socket.onclose = () => {
      handlers.onStatus?.('disconnected')
      if (retries < 5) {
        retries += 1
        setTimeout(connect, 400 * 2 ** retries)
      }
    }
  }
  connect()
  return {
    send(message) {
      if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ message }))
      else handlers.onFallback?.(message)
    },
    close() {
      retries = 5
      socket?.close()
    },
  }
}
