import Sidebar from './components/shared/Sidebar'
import Topbar from './components/shared/Topbar'
import { useOperatorStatus } from './hooks/useOperatorStatus'
import { useOperatorStore } from './store/operatorStore'
import Agents from './pages/Agents'
import ConversationHistory from './pages/ConversationHistory'
import CustomerChat from './pages/CustomerChat'
import Dashboard from './pages/Dashboard'
import IntentManager from './pages/IntentManager'
import LiveQueue from './pages/LiveQueue'
import Settings from './pages/Settings'

const pages = {
  dashboard: Dashboard,
  chat: CustomerChat,
  queue: LiveQueue,
  history: ConversationHistory,
  intents: IntentManager,
  agents: Agents,
  settings: Settings,
}

export default function App() {
  useOperatorStatus()
  const activePage = useOperatorStore((s) => s.activePage)
  const Page = pages[activePage] || Dashboard
  return (
    <div className="min-h-screen bg-base text-slate-100">
      <Sidebar />
      <Topbar />
      <main className="px-4 py-5 lg:ml-60 lg:px-6">
        <Page />
      </main>
    </div>
  )
}
