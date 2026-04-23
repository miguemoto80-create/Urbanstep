import { createContext, useContext, useState, ReactNode } from 'react'
import { User, UserRole } from '../types'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('urban-step-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (role: UserRole) => {
    const newUser: User = {
      id: '1',
      nombre: role === 'admin' ? 'Administrador' : 'Cliente',
      email: role === 'admin' ? 'admin@urbanstep.com' : 'cliente@urbanstep.com',
      role,
    }
    setUser(newUser)
    localStorage.setItem('urban-step-user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('urban-step-user')
  }

  const isAdmin = user?.role === 'admin'

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
