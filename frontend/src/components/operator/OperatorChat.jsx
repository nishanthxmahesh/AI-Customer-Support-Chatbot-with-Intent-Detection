import MessageInput from '../chat/MessageInput'

export default function OperatorChat() {
  return (
    <div className="glass flex min-h-[620px] flex-col rounded-lg">
      <div className="border-b border-white/10 p-4">
        <div className="font-display font-bold tracking-wide">Avery Morgan</div>
        <div className="font-data text-xs text-slate-400">billing_inquiry | frustrated | session demo-billing</div>
      </div>
      <div className="flex-1 space-y-3 overflow-auto p-4">
        <div className="mx-auto w-fit rounded-full bg-white/5 px-3 py-1 font-data text-xs text-slate-400">AI handed off at 10:42 AM</div>
        <div className="rounded-lg border border-white/10 border-l-2 border-l-lime bg-panel p-3 text-sm">I can help review that billing question. Please share the invoice number.</div>
        <div className="ml-auto max-w-[80%] rounded-lg bg-lime/10 p-3 text-sm">I already did. I want someone to fix this now.</div>
        <div className="mx-auto w-fit rounded-full bg-cyan/10 px-3 py-1 font-data text-xs text-cyan">Agent Sarah joined</div>
      </div>
      <div className="border-t border-white/10 p-4">
        <MessageInput onSend={() => {}} />
      </div>
    </div>
  )
}
