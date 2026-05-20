export default function StatusPill({ children, color = 'lime' }) {
  const colors = {
    lime: 'border-lime/30 bg-lime/10 text-lime',
    cyan: 'border-cyan/30 bg-cyan/10 text-cyan',
    danger: 'border-danger/30 bg-danger/10 text-danger',
    amber: 'border-amber/30 bg-amber/10 text-amber',
    slate: 'border-white/10 bg-white/5 text-slate-300',
  }
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${colors[color]}`}>{children}</span>
}
