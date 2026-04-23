import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/producto/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link
          to={`/producto/${product.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Eye className="h-5 w-5" />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-primary hover:text-primary-foreground"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      {product.stock <= 5 && product.stock > 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
          Últimas {product.stock}
        </span>
      )}

      {product.stock === 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-muted-foreground px-3 py-1 text-xs font-medium text-white">
          Agotado
        </span>
      )}

      <div className="p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.marca}
        </span>
        <Link to={`/producto/${product.id}`}>
          <h3 className="mt-1 font-semibold transition-colors hover:text-primary">
            {product.nombre}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-bold">{formatPrice(product.precio)}</p>
      </div>
    </div>
  )
}
