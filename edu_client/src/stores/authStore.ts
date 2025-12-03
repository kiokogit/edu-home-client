import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  first_name?: string
  last_name?: string
  access_token: string
  refresh_token: string
  backendUser: any
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
