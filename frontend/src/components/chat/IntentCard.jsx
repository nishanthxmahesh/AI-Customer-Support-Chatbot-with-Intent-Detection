import ConfidenceBar from '../shared/ConfidenceBar'
import StatusPill from '../shared/StatusPill'

export default function IntentCard({ meta }) {
  if (!meta) return null
  const alternatives = Object.entries(meta.all_scores || {}).filter(([k]) => k !== meta.intent).slice(0, 3)
  return (
    <div className="intent-pop glass mt-2 rounded-md p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <StatusPill color={meta.confidence >= 80 ? 'lime' : meta.confidence >= 60 ? 'amber' : 'danger'}>{meta.intent?.replaceAll('_', ' ')}</StatusPill>
        <span className="font-data text-xs text-slate-300">{meta.confidence}% confidence</span>
      </div>
      <ConfidenceBar value={meta.confidence} />
      <div className="mt-3 font-data text-xs text-slate-400">
        {alternatives.map(([name, score]) => `${name.replaceAll('_', ' ')} ${score}%`).join(' | ')}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        Was this helpful?
        <button className="rounded border border-white/10 px-2 py-1 hover:border-lime">👍</button>
        <button className="rounded border border-white/10 px-2 py-1 hover:border-danger">👎</button>
      </div>
    </div>
  )
}
