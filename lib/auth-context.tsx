'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { MOCK_USER_PROFILE } from '@/lib/mock-data'
import type { UserProfile } from '@/lib/mock-data'

export interface AuthUser {
  id: string
  name: string
  nameFA: string
  email: string
  phone: string
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
}

function profileToAuthUser(profile: UserProfile): AuthUser {
  return {
    id: profile.id,
    name: profile.name,
    nameFA: profile.nameFA,
    email: profile.email,
    phone: profile.phone,
    avatar: profile.avatar,
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const stored = localStorage.getItem('aura_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('aura_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800))
    if (email === 'demo@aura.com' && password === 'demo123') {
      const authUser = profileToAuthUser(MOCK_USER_PROFILE)
      localStorage.setItem('aura_user', JSON.stringify(authUser))
      setUser(authUser)
      return { success: true }
    }
    return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' }
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 1000))
    if (email.includes('exists')) {
      return { success: false, error: 'این ایمیل قبلاً ثبت شده است' }
    }
    const authUser: AuthUser = {
      id: `user-${Date.now()}`,
      name,
      nameFA: name,
      email,
      phone,
      avatar: '/images/profile/avatar.webp',
    }
    localStorage.setItem('aura_user', JSON.stringify(authUser))
    setUser(authUser)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('aura_user')
    setUser(null)
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800))
    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
