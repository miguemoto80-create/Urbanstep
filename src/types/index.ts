export interface Product {
  id: string
  codigo_unico: string
  nombre: string
  precio: number
  marca: string
  imagen_url: string
  descripcion: string
  stock_por_talla: Record<string, number>
  categoria?: string
  color?: string
}

export interface CartItem extends Product {
  talla: string
  cantidad: number
}

export type UserRole = 'cliente' | 'admin'

export interface User {
  id: string
  nombre: string
  email: string
  rol: UserRole
}
