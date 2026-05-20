import IntentCard from './IntentCard'

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  const isOperator = message.role === 'operator'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'border-lime/20 bg-lime/10 text-white'
              : isOperator
                ? 'border-cyan/30 bg-white text-slate-950'
                : 'border-white/10 border-l-2 border-l-lime bg-panel text-slate-100'
          }`}
        >
          {message.text}
        </div>
        {!isUser && <IntentCard meta={message.meta} />}
      </div>
    </div>
  )
}
