import { useEffect } from 'react'
import { useOperatorStore } from '../store/operatorStore'

export function useOperatorStatus() {
  const status = useOperatorStore((s) => s.status)
  useEffect(() => {
    const id = setInterval(() => {
      fetch('/api/auth/operator-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => {})
    }, 30000)
    return () => clearInterval(id)
  }, [status])
}
