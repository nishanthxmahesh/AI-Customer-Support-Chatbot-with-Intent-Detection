import { useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import { useOperatorStore } from '../../store/operatorStore'

export default function Topbar() {
  const { data } = useQuery({ queryKey: ['dashboard-top'], queryFn: api.dashboard, refetchInterval: 5000 })
  const status = useOperatorStore((s) => s.status)
  const setStatus = useOperatorStore((s) => s.setStatus)
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-base/80 px-5 py-3 backdrop-blur lg:ml-60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-black tracking-wide">AI Customer Support Control Center</h1>
          <p className="font-data text-xs text-slate-400">Real-time classification, escalation, and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass flex items-center gap-2 rounded-md px-3 py-2 font-data text-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime" />
            {data?.active_sessions ?? 18} live sessions
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-white/10 bg-panel px-3 py-2 text-sm">
            <option>online</option>
            <option>busy</option>
            <option>away</option>
            <option>offline</option>
          </select>
        </div>
      </div>
    </header>
  )
}
