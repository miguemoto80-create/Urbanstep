import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, CartItem } from '../types'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, talla: string, cantidad: number) => void
  removeFromCart: (productId: string, talla: string) => void
  updateQuantity: (productId: string, talla: string, cantidad: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('urban-step-cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('urban-step-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, talla: string, cantidad: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.talla === talla)
      const maxStock = product.stock_por_talla[talla] || 0
      
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.talla === talla
            ? { ...item, cantidad: Math.min(item.cantidad + cantidad, maxStock) }
            : item
        )
      }
      return [...prev, { ...product, talla, cantidad }]
    })
  }

  const removeFromCart = (productId: string, talla: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === productId && item.talla === talla)))
  }

  const updateQuantity = (productId: string, talla: string, cantidad: number) => {
    if (cantidad < 1) {
      removeFromCart(productId, talla)
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.talla === talla) {
          const maxStock = item.stock_por_talla[talla] || 0
          return { ...item, cantidad: Math.min(cantidad, maxStock) }
        }
        return item
      })
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
