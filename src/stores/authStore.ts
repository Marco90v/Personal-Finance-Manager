import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>
  logout: () => void
  socialLogin: (provider: "google" | "linkedin") => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // 🔐 TODO: Replace with Supabase auth
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const mockUser: User = {
            id: "1",
            email,
            firstName: "John",
            lastName: "Doe",
          }

          set({ user: mockUser, isAuthenticated: true, isLoading: false })
        } catch (err) {
          set({ error: "Login failed. Please check your credentials.", isLoading: false })
          throw err
        }
      },

      register: async ({ email, password, firstName, lastName }) => {
        set({ isLoading: true, error: null })
        try {
          // 🔐 TODO: Replace with Supabase signUp
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const mockUser: User = {
            id: "2",
            email,
            firstName,
            lastName,
          }

          set({ user: mockUser, isAuthenticated: true, isLoading: false })
        } catch (err) {
          set({ error: "Registration failed. Please try again.", isLoading: false })
          throw err
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      socialLogin: async (provider) => {
        set({ isLoading: true, error: null })
        try {
          // 🔐 TODO: Replace with Supabase social login
          console.log(`Attempting ${provider} login...`)
          await new Promise((resolve) => setTimeout(resolve, 500))

          set({ isLoading: false })
          alert(`${provider} login will be available once Supabase is integrated`)
        } catch (err) {
          set({ error: `${provider} login failed. Please try again.`, isLoading: false })
          throw err
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
