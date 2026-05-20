export default function ConfidenceBar({ value = 0 }) {
  const color = value >= 80 ? 'bg-lime' : value >= 60 ? 'bg-amber' : 'bg-danger'
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className={`confidence-fill h-full rounded-full ${color}`} style={{ width: `${Math.max(2, value)}%` }} />
    </div>
  )
}
