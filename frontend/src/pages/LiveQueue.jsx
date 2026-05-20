import { useQuery } from '@tanstack/react-query'
import AISidebar from '../components/operator/AISidebar'
import OperatorChat from '../components/operator/OperatorChat'
import QueueCard from '../components/operator/QueueCard'
import { api } from '../services/api'

export default function LiveQueue() {
  const { data = [] } = useQuery({ queryKey: ['queue'], queryFn: api.queue, refetchInterval: 10000 })
  return (
    <div className="grid gap-5 xl:grid-cols-[300px_1fr_280px]">
      <aside className="glass rounded-lg p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-black tracking-wide">Live Queue</h2>
          <span className="rounded-full bg-danger px-2 py-1 font-data text-xs">{data.length}</span>
        </div>
        <div className="mb-3 flex gap-2 text-xs">
          {['Unassigned', 'My Chats', 'All Active'].map((tab) => <button key={tab} className="rounded border border-white/10 px-2 py-1 text-slate-300">{tab}</button>)}
        </div>
        <div className="space-y-3">
          {data.map((item) => <QueueCard key={item.session_id} item={item} />)}
        </div>
      </aside>
      <OperatorChat />
      <AISidebar />
    </div>
  )
}
