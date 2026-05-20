import { useQuery } from '@tanstack/react-query'
import StatusPill from '../components/shared/StatusPill'
import { api } from '../services/api'

export default function Agents() {
  const { data = [] } = useQuery({ queryKey: ['operators'], queryFn: api.operators })
  return (
    <div className="glass rounded-lg p-4">
      <h2 className="font-display text-2xl font-black tracking-wide">Agents</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {data.map((agent) => (
          <div key={agent.id} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan/10 text-cyan">{agent.full_name[0]}</div>
              <div><strong>{agent.full_name}</strong><div className="font-data text-xs text-slate-400">{agent.role}</div></div>
            </div>
            <div className="mt-4 flex justify-between"><StatusPill color={agent.operator_status === 'online' ? 'lime' : 'amber'}>{agent.operator_status}</StatusPill><span className="font-data text-xs">{agent.active_chat_ids.length} active</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}
