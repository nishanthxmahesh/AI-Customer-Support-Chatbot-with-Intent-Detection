export default function EscalationBanner({ reason }) {
  return (
    <div className="drop-alert rounded-md border border-danger/40 bg-danger/10 p-3 text-sm">
      <div className="font-semibold text-danger">Human handoff recommended</div>
      <p className="mt-1 text-slate-200">I want to make sure you're taken care of. Let me connect you with a human agent.</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-data text-xs text-slate-400">Reason: {reason || 'support escalation'} | ~4 min wait</span>
        <div className="flex gap-2">
          <button className="rounded-md bg-danger px-3 py-1.5 text-xs font-bold text-white">Connect now</button>
          <button className="rounded-md border border-white/10 px-3 py-1.5 text-xs">Keep AI</button>
        </div>
      </div>
    </div>
  )
}
