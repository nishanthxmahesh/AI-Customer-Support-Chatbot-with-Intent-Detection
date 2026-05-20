export default function LiveFeed({ data }) {
  return (
    <aside className="glass rounded-lg p-4">
      <h3 className="font-display font-bold tracking-wide">Live Activity</h3>
      <div className="mt-4 space-y-3">
        {(data?.live_feed || []).map((item) => (
          <button key={`${item.ago}-${item.intent}`} className="w-full rounded-md border border-white/10 bg-white/[0.03] p-3 text-left hover:border-cyan/40">
            <div className="flex justify-between font-data text-xs">
              <span>{item.ago} ago</span>
              <span className={item.escalated ? 'text-danger' : 'text-lime'}>{item.confidence}%</span>
            </div>
            <div className="mt-1 text-sm">{item.intent.replaceAll('_', ' ')} {item.escalated && ' - Escalated'}</div>
          </button>
        ))}
      </div>
    </aside>
  )
}
