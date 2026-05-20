const groups = [
  ['Bot Config', ['Bot name', 'Avatar URL', 'Welcome message', 'Quick reply chips']],
  ['Confidence Thresholds', ['High boundary', 'Low boundary', 'Sample score preview']],
  ['Escalation Rules', ['Trigger toggles', 'Keyword list', 'VIP emails']],
  ['Response Engine', ['Template vs LLM', 'Provider', 'System prompt']],
  ['Operator Settings', ['Max chats', 'Auto-assign logic', 'Timeout minutes']],
  ['CSAT Survey', ['Enable survey', 'Message', 'Scale type']],
  ['Working Hours', ['Weekdays', 'Time ranges', 'Timezone']],
  ['Safety Filters', ['Banned words', 'Severity', 'Block behavior']],
  ['Knowledge Base', ['Articles', 'Tags', 'Linked intents']],
]

export default function Settings() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {groups.map(([title, fields]) => (
        <section key={title} className="glass rounded-lg p-4">
          <h2 className="font-display text-lg font-black tracking-wide">{title}</h2>
          <div className="mt-4 space-y-3">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="font-data text-xs text-slate-400">{field}</span>
                <input className="mt-1 w-full rounded-md border border-white/10 bg-panel px-3 py-2 outline-none focus:border-lime/50" placeholder={field} />
              </label>
            ))}
            <button className="rounded-md bg-lime px-3 py-2 text-sm font-bold text-slate-950">Save</button>
          </div>
        </section>
      ))}
    </div>
  )
}
