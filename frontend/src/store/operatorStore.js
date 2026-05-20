import { create } from 'zustand'

export const useOperatorStore = create((set) => ({
  status: 'online',
  activePage: 'dashboard',
  setStatus: (status) => set({ status }),
  setActivePage: (activePage) => set({ activePage }),
}))
