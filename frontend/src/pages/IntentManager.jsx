import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ConfidenceBar from '../components/shared/ConfidenceBar'
import { api } from '../services/api'

export default function IntentManager() {
  const [text, setText] = useState('My card was charged twice and I need help')
  const { data: intents = [] } = useQuery({ queryKey: ['intents'], queryFn: api.intents })
  const classify = useMutation({ mutationFn: api.classify })
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {intents.map((intent) => (
          <div key={intent.name} className="glass rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: intent.color }} />
              <h3 className="font-display font-bold">{intent.name.replaceAll('_', ' ')}</h3>
            </div>
            <div className="mt-3 font-data text-xs text-slate-400">{intent.examples} examples | F1 {intent.f1}</div>
            <p className="mt-3 text-sm text-slate-300">"Where is my order" | "I need support" | "Please help"</p>
            <button className="mt-4 rounded-md border border-white/10 px-3 py-2 text-sm hover:border-lime/40">Add Example</button>
          </div>
        ))}
      </div>
      <div className="glass rounded-lg p-4">
        <h2 className="font-display text-xl font-black tracking-wide">Classifier Tester</h2>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-4 h-28 w-full rounded-md border border-white/10 bg-panel p-3 outline-none focus:border-lime/50" />
        <button onClick={() => classify.mutate(text)} className="mt-3 rounded-md bg-lime px-4 py-2 font-bold text-slate-950">Classify</button>
        {classify.data && (
          <div className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 flex justify-between"><strong>{classify.data.primary_intent.replaceAll('_', ' ')}</strong><span className="font-data">{classify.data.confidence}% | {classify.data.processing_time_ms}ms</span></div>
            <ConfidenceBar value={classify.data.confidence} />
            <div className="mt-4 space-y-2">
              {Object.entries(classify.data.all_scores).map(([name, score]) => (
                <div key={name} className="grid grid-cols-[160px_1fr_50px] items-center gap-3 font-data text-xs">
                  <span>{name}</span><ConfidenceBar value={score} /><span>{score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="glass rounded-lg p-4">
          <h3 className="font-display font-bold">Retrain Model</h3>
          <p className="mt-2 text-sm text-slate-400">Starts a background training task and polls status every 3 seconds.</p>
          <button className="mt-4 rounded-md border border-lime/40 px-4 py-2 text-lime">Retrain Classifier</button>
        </div>
        <div className="glass rounded-lg p-4">
          <h3 className="font-display font-bold">Response Template Editor</h3>
          <textarea className="mt-3 h-28 w-full rounded-md border border-white/10 bg-panel p-3" defaultValue="Your order {order_id} is currently {status} and arrives by {eta}." />
        </div>
      </div>
    </div>
  )
}
