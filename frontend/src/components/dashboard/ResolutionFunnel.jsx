import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts'

export default function ResolutionFunnel() {
  const data = [
    { name: 'Started', value: 500, fill: '#22D3EE' },
    { name: 'Classified', value: 486, fill: '#A3E635' },
    { name: 'Bot Resolved', value: 390, fill: '#84CC16' },
    { name: 'Escalated', value: 110, fill: '#F43F5E' },
    { name: 'CSAT', value: 300, fill: '#FBBF24' },
  ]
  return (
    <div className="glass h-80 rounded-lg p-4">
      <h3 className="mb-3 font-display font-bold tracking-wide">Resolution Funnel</h3>
      <ResponsiveContainer width="100%" height="85%">
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" fill="#e2e8f0" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  )
}
