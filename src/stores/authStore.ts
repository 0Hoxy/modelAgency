/**
 * Authentication Store - Zustand
 * 사용자 인증 상태를 전역으로 관리
 */
import type { UserResponse } from '@api/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthState {
  // State
  user: UserResponse | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean

  // Actions
  login: (user: UserResponse, token: string, refreshToken: string) => void
  logout: () => void
  updateUser: (user: Partial<UserResponse>) => void
  updateTokens: (token: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      // Actions
      login: (user, token, refreshToken) =>
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      updateTokens: (token, refreshToken) =>
        set({
          token,
          refreshToken,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
