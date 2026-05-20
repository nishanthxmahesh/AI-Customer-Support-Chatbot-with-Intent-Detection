const intents = ['order', 'billing', 'refund', 'complaint', 'product', 'account', 'shipping', 'tech', 'payment', 'returns']

export default function IntentHeatmap() {
  return (
    <div className="glass rounded-lg p-4">
      <h3 className="mb-4 font-display font-bold tracking-wide">Intent x Time Heatmap</h3>
      <div className="grid grid-cols-[80px_repeat(12,1fr)] gap-1 font-data text-[10px] text-slate-400">
        <div />
        {Array.from({ length: 12 }, (_, i) => <div key={i}>{i * 2}</div>)}
        {intents.map((intent, row) => (
          <>
            <div key={`${intent}-label`} className="truncate">{intent}</div>
            {Array.from({ length: 12 }, (_, col) => {
              const opacity = 0.12 + (((row + 2) * (col + 3)) % 9) / 10
              return <div key={`${intent}-${col}`} className="h-5 rounded-sm bg-lime" style={{ opacity }} title={`${intent}: ${Math.round(opacity * 40)} events`} />
            })}
          </>
        ))}
      </div>
    </div>
  )
}
