import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut, Shield } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, isAdmin, login, logout } = useAuth()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-medium transition-colors hover:text-foreground/80',
      isActive ? 'text-foreground' : 'text-foreground/60'
    )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">US</span>
          </div>
          <span className="hidden text-xl font-bold tracking-tight sm:block">
            Urban Step
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={navLinkClass}>
            Catálogo
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                {isAdmin && <Shield className="h-4 w-4 text-primary" />}
                <span className="text-sm font-medium">{user.nombre}</span>
              </div>
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => login('cliente')}
                className="rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
              >
                Cliente
              </button>
              <button
                onClick={() => login('admin')}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Admin
              </button>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-muted' : 'hover:bg-muted'
                )
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalogo"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-muted' : 'hover:bg-muted'
                )
              }
            >
              Catálogo
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-muted' : 'hover:bg-muted'
                  )
                }
              >
                Admin
              </NavLink>
            )}
            <div className="border-t border-border pt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user.nombre}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      login('cliente')
                      setIsOpen(false)
                    }}
                    className="flex-1 rounded-lg bg-muted px-4 py-2 text-sm font-medium"
                  >
                    Cliente
                  </button>
                  <button
                    onClick={() => {
                      login('admin')
                      setIsOpen(false)
                    }}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
