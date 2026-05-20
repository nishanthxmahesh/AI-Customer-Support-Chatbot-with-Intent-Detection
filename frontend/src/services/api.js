const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

export const api = {
  dashboard: () => request('/analytics/dashboard'),
  startSession: (sessionId) => request('/chat/session/start', { method: 'POST', body: JSON.stringify({ session_id: sessionId, channel: 'standalone' }) }),
  sendMessage: (session_id, message) => request('/chat/message', { method: 'POST', body: JSON.stringify({ session_id, message }) }),
  queue: () => request('/operators/queue'),
  operators: () => request('/operators'),
  intents: () => request('/intents'),
  classify: (text) => request('/intents/classify', { method: 'POST', body: JSON.stringify({ text }) }),
  sessions: () => request('/sessions'),
}
