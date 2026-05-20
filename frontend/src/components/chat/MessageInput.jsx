import { Send } from 'lucide-react'
import { useState } from 'react'

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const submit = () => {
    if (!value.trim()) return
    onSend(value.trim())
    setValue('')
  }
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2">
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder={disabled ? 'Waiting for an agent...' : 'Type your message'}
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-500"
      />
      <button onClick={submit} className="grid h-9 w-9 place-items-center rounded-full bg-lime text-base" aria-label="Send message">
        <Send size={17} />
      </button>
    </div>
  )
}
