import { useQuery } from '@tanstack/react-query'
import ConfidenceBar from '../components/shared/ConfidenceBar'
import StatusPill from '../components/shared/StatusPill'
import { api } from '../services/api'

export default function ConversationHistory() {
  const { data = [] } = useQuery({ queryKey: ['sessions'], queryFn: api.sessions })
  const rows = data.length ? data : [
    { session_id: 'sess_9a12f0', customer_name: 'Jordan Lee', primary_intent: 'order_tracking', overall_confidence: 94.2, status: 'resolved', message_count: 6 },
    { session_id: 'sess_7b42ac', customer_name: 'Mina Patel', primary_intent: 'complaint', overall_confidence: 78.1, status: 'operator', message_count: 11 },
  ]
  return (
    <div className="space-y-5">
      <div className="glass grid gap-3 rounded-lg p-4 md:grid-cols-5">
        <input className="rounded border border-white/10 bg-panel px-3 py-2" placeholder="Search session or email" />
        <select className="rounded border border-white/10 bg-panel px-3 py-2"><option>All intents</option></select>
        <select className="rounded border border-white/10 bg-panel px-3 py-2"><option>All resolution states</option></select>
        <input type="range" min="0" max="100" className="accent-lime" />
        <button className="rounded bg-lime px-3 py-2 font-bold text-slate-950">Export JSON</button>
      </div>
      <div className="glass overflow-hidden rounded-lg">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 font-data text-xs uppercase text-slate-400">
            <tr><th className="p-3">Session</th><th>Customer</th><th>Messages</th><th>Primary Intent</th><th>Avg Confidence</th><th>Resolution</th><th>Escalated</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.session_id} className="border-t border-white/10">
                <td className="p-3 font-data">{row.session_id.slice(0, 12)}</td>
                <td>{row.customer_name || 'Anonymous Guest'}</td>
                <td>{row.message_count}</td>
                <td><StatusPill color="cyan">{row.primary_intent?.replaceAll('_', ' ')}</StatusPill></td>
                <td className="w-52"><div className="flex items-center gap-3"><ConfidenceBar value={row.overall_confidence || 81.4} /><span className="font-data text-xs">{row.overall_confidence || 81.4}%</span></div></td>
                <td>{row.status}</td>
                <td>{row.escalation_required ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="glass rounded-lg p-4">
        <h3 className="font-display font-bold">Conversation Detail Preview</h3>
        <div className="mt-4 border-l-2 border-danger pl-4 text-sm text-slate-300">Escalation event: keyword_trigger</div>
        <div className="mt-3 border-l-2 border-cyan pl-4 text-sm text-slate-300">Agent Sarah joined and resolved the conversation.</div>
      </div>
    </div>
  )
}
