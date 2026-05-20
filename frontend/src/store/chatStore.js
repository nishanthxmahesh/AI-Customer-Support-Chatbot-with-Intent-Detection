import { create } from 'zustand'

export const useChatStore = create((set) => ({
  sessionId: localStorage.getItem('aria_session') || crypto.randomUUID(),
  messages: [],
  connection: 'idle',
  setConnection: (connection) => set({ connection }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  reset: () => set({ messages: [] }),
}))
