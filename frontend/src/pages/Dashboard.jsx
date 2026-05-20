import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import IntentHeatmap from '../components/dashboard/IntentHeatmap'
import KPICard from '../components/dashboard/KPICard'
import LiveFeed from '../components/dashboard/LiveFeed'
import ResolutionFunnel from '../components/dashboard/ResolutionFunnel'
import { api } from '../services/api'

export default function Dashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: api.dashboard, refetchInterval: 5000 })
  if (isLoading) return <div className="glass rounded-lg p-8">Loading command center...</div>
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {data.kpis.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="glass h-96 rounded-lg p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display font-bold tracking-wide">Intent Distribution</h3>
              <select className="rounded border border-white/10 bg-panel px-2 py-1 font-data text-xs"><option>Today</option><option>7 Days</option><option>30 Days</option></select>
            </div>
            <ResponsiveContainer width="100%" height="58%">
              <PieChart>
                <Pie data={data.intent_distribution} dataKey="value" nameKey="name" outerRadius={90}>
                  {data.intent_distribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-4 border-t border-white/10 pt-3 font-data text-xs text-slate-400">
              <span>Intent</span><span>Count</span><span>Share</span><span>Avg Conf</span>
              {data.intent_distribution.slice(0, 4).map((row) => (
                <>
                  <span key={`${row.name}-n`} className="truncate text-slate-200">{row.name}</span>
                  <span key={`${row.name}-v`}>{row.value}</span>
                  <span key={`${row.name}-s`}>{(row.value / 12).toFixed(1)}%</span>
                  <span key={`${row.name}-c`}>84.2%</span>
                </>
              ))}
            </div>
          </div>
          <div className="glass h-96 rounded-lg p-4">
            <h3 className="mb-3 font-display font-bold tracking-wide">Confidence Histogram</h3>
            <ResponsiveContainer width="100%" height="88%">
              <ComposedChart data={data.confidence_histogram}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" />
                <XAxis dataKey="bucket" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" fill="#A3E635" radius={[4, 4, 0, 0]} />
                <Line dataKey="escalation" stroke="#F43F5E" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass h-80 rounded-lg p-4">
          <h3 className="mb-3 font-display font-bold tracking-wide">Conversation Volume Over Time</h3>
          <ResponsiveContainer width="100%" height="86%">
            <AreaChart data={data.volume}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Area dataKey="bot" stackId="1" fill="#A3E635" stroke="#A3E635" />
              <Area dataKey="escalated" stackId="1" fill="#F43F5E" stroke="#F43F5E" />
              <Area dataKey="abandoned" stackId="1" fill="#64748B" stroke="#64748B" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <IntentHeatmap />
          <ResolutionFunnel />
        </div>
        <div className="glass rounded-lg p-4">
          <h3 className="mb-3 font-display font-bold">Escalation Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[{ name: 'Low Confidence', count: 42 }, { name: 'Explicit Request', count: 31 }, { name: 'Keyword', count: 18 }, { name: 'Complaint Loop', count: 14 }, { name: 'VIP', count: 8 }]} layout="vertical">
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#F43F5E" radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <LiveFeed data={data} />
    </div>
  )
}
