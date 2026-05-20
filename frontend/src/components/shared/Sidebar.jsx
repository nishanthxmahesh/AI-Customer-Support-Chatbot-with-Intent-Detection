import { BarChart3, Bot, BrainCircuit, History, RadioTower, Settings, Users } from 'lucide-react'
import { useOperatorStore } from '../../store/operatorStore'

const nav = [
  ['dashboard', 'Dashboard', BarChart3],
  ['chat', 'Customer Chat', Bot],
  ['queue', 'Live Queue', RadioTower],
  ['history', 'History', History],
  ['intents', 'Intent Manager', BrainCircuit],
  ['agents', 'Agents', Users],
  ['settings', 'Settings', Settings],
]

export default function Sidebar() {
  const activePage = useOperatorStore((s) => s.activePage)
  const setActivePage = useOperatorStore((s) => s.setActivePage)
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-white/10 bg-sidebar/95 p-4 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-lime text-base font-black text-slate-950 shadow-glow">A</div>
        <div>
          <div className="font-display text-lg font-black tracking-wide">ARIA OPS</div>
          <div className="font-data text-xs text-slate-400">Support Command</div>
        </div>
      </div>
      <nav className="space-y-1">
        {nav.map(([id, label, Icon]) => {
          const active = activePage === id
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                active ? 'bg-lime/10 text-lime shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
