import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  login: (token: string, userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('urban-step-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (token: string, userData: User) => {
    setUser(userData)
    localStorage.setItem('urban-step-user', JSON.stringify(userData))
    localStorage.setItem('urban-step-token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('urban-step-user')
    localStorage.removeItem('urban-step-token')
  }

  const isAdmin = user?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
