import StatusPill from '../shared/StatusPill'

export default function QueueCard({ item }) {
  const priorityColor = { urgent: 'border-l-danger', high: 'border-l-orange-500', medium: 'border-l-amber', low: 'border-l-slate-500' }[item.escalation_priority] || 'border-l-slate-500'
  return (
    <div className={`rounded-md border border-white/10 border-l-4 ${priorityColor} bg-white/[0.03] p-3`}>
      <div className="flex items-center justify-between gap-2">
        <strong>{item.customer_name || 'Anonymous Guest'}</strong>
        <StatusPill color={item.escalation_priority === 'urgent' ? 'danger' : 'amber'}>{item.escalation_priority}</StatusPill>
      </div>
      <div className="mt-2 font-data text-xs text-slate-400">{item.primary_intent?.replaceAll('_', ' ')} | {item.message_count} messages</div>
      <div className="mt-2 text-xs text-danger">{item.escalation_reason?.replaceAll('_', ' ')}</div>
      <button className="mt-3 w-full rounded-md bg-lime py-2 text-sm font-bold text-slate-950">Take Chat</button>
    </div>
  )
}
