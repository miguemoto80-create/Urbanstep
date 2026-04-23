export interface Product {
  id: string
  nombre: string
  precio: number
  marca: string
  imagen_url: string
  descripcion: string
  stock: number
  categoria?: string
}

export interface CartItem extends Product {
  cantidad: number
}

export type UserRole = 'cliente' | 'admin'

export interface User {
  id: string
  nombre: string
  email: string
  role: UserRole
}
