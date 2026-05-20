import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { useChatStore } from '../store/chatStore'

export function useChat() {
  const { sessionId, addMessage } = useChatStore()
  const mutation = useMutation({
    mutationFn: (message) => api.sendMessage(sessionId, message),
    onSuccess: (payload) => {
      addMessage({ role: 'bot', text: payload.response_text, meta: payload })
    },
  })
  const send = (text) => {
    addMessage({ role: 'user', text })
    mutation.mutate(text)
  }
  return { send, isTyping: mutation.isPending }
}
