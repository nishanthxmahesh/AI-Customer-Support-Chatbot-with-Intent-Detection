import { MessageCircle, Minus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ChatBubble from '../components/chat/ChatBubble'
import EscalationBanner from '../components/chat/EscalationBanner'
import MessageInput from '../components/chat/MessageInput'
import SuggestedActions from '../components/chat/SuggestedActions'
import TypingIndicator from '../components/chat/TypingIndicator'
import { useChat } from '../hooks/useChat'
import { useChatStore } from '../store/chatStore'

const quickReplies = ['Track My Order', 'Billing Question', 'Request a Refund', 'Technical Issue']

export default function CustomerChat() {
  const [open, setOpen] = useState(true)
  const bottomRef = useRef(null)
  const { messages, sessionId, addMessage } = useChatStore()
  const { send, isTyping } = useChat()
  const lastBot = [...messages].reverse().find((m) => m.role === 'bot')
  const escalated = lastBot?.meta?.escalation_required

  useEffect(() => {
    localStorage.setItem('aria_session', sessionId)
    if (!messages.length) {
      const timer = setTimeout(() => addMessage({ role: 'bot', text: "Hey there! I'm Aria, your AI support assistant. What can I help you with today?" }), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isTyping])

  return (
    <div className="min-h-[720px]">
      <div className="mb-5">
        <h2 className="font-display text-2xl font-black tracking-wide">Customer Chat Widget</h2>
        <p className="mt-1 text-sm text-slate-400">Standalone route preview. The same component can be embedded as a floating iframe widget.</p>
      </div>
      <div className="fixed bottom-6 right-6 z-40">
        {!open && (
          <button onClick={() => setOpen(true)} className="relative grid h-14 w-14 place-items-center rounded-full bg-lime text-slate-950 shadow-glow">
            <MessageCircle />
            <span className="absolute -right-1 -top-1 rounded-full bg-danger px-1.5 py-0.5 font-data text-[10px] text-white">2</span>
          </button>
        )}
        {open && (
          <section className="flex h-[580px] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-lg border border-white/10 bg-base shadow-2xl shadow-black/60">
            <header className="flex items-center justify-between border-b border-white/10 bg-sidebar p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-lime/40 bg-lime/10 text-lime shadow-glow">A</div>
                <div>
                  <div className="font-bold">Aria</div>
                  <div className="flex items-center gap-1.5 font-data text-xs text-slate-400"><span className="h-2 w-2 rounded-full bg-lime" />AI Support Assistant</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded p-1 text-slate-400 hover:text-white"><Minus size={18} /></button>
                <button onClick={() => setOpen(false)} className="rounded p-1 text-slate-400 hover:text-white"><X size={18} /></button>
              </div>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, idx) => <ChatBubble key={`${message.role}-${idx}-${message.text}`} message={message} />)}
              {messages.length === 1 && <SuggestedActions actions={quickReplies.map((label) => ({ label, action_type: label }))} onPick={send} />}
              {lastBot?.meta?.suggested_actions && <SuggestedActions actions={lastBot.meta.suggested_actions} onPick={send} />}
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
            <footer className="border-t border-white/10 p-3">
              {escalated ? <EscalationBanner reason={lastBot.meta.escalation_reason} /> : <MessageInput onSend={send} disabled={isTyping} />}
              <div className="mt-2 text-center font-data text-[10px] text-slate-600">AI-powered</div>
            </footer>
          </section>
        )}
      </div>
    </div>
  )
}
