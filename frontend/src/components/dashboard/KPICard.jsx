export default function KPICard({ label, value, delta }) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="font-data text-xs uppercase text-slate-500">{label}</div>
      <div className="mt-3 font-display text-2xl font-black tracking-wide">{value}</div>
      <div className="mt-2 font-data text-xs text-lime">{delta}</div>
    </div>
  )
}
