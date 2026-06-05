import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../types'

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductById: (id: string) => Product | undefined
  fetchProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      
      const parsedProducts = data.map((p: any) => {
        let stock = p.stock_por_talla
        while (typeof stock === 'string') {
          try { stock = JSON.parse(stock) } catch (e) { stock = {}; break; }
        }
        return { ...p, precio: Number(p.precio), stock_por_talla: stock || {} }
      })
      setProducts(parsedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const token = localStorage.getItem('urban-step-token')
    try {
      await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      })
      await fetchProducts()
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  const updateProduct = async (product: Product) => {
    const token = localStorage.getItem('urban-step-token')
    try {
      await fetch(`http://localhost:5000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      })
      await fetchProducts()
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('urban-step-token')
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  const getProductById = (id: string) => products.find((p) => String(p.id) === String(id))

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductById, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
