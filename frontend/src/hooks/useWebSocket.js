import { useEffect, useRef } from 'react'
import { createChatSocket } from '../services/wsManager'

export function useWebSocket(sessionId, handlers) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = createChatSocket(sessionId, handlers)
    return () => ref.current?.close()
  }, [sessionId])
  return ref
}
