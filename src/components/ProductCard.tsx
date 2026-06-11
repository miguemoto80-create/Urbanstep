import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'

import { formatPrice } from '../lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [selectedTalla, setSelectedTalla] = useState<string>(Object.keys(product.stock_por_talla || {})[0] || '')
  const [added, setAdded] = useState(false);

  const totalStock = Object.values(product.stock_por_talla || {}).reduce(
    (acc, curr) => acc + (Number(curr) || 0),
    0
  )

  const rating = (parseInt(product.id || '1') % 2) + 4
  const reviewCount = parseInt(product.id || '1') * 24

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (selectedTalla && totalStock > 0) {
      addToCart({ ...product, talla: selectedTalla })
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  return (
    <div className="group relative bg-white border border-neutral-200 transition-all hover:border-black">
      <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {totalStock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 font-bold uppercase tracking-widest text-xs">
            Sold Out
          </div>
        )}
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-black text-black' : 'text-neutral-300'}`} />
          ))}
          <span className="text-[10px] text-neutral-400 ml-1">({reviewCount})</span>
        </div>
        
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-sm font-medium text-neutral-900 group-hover:underline line-clamp-1">
            {product.nombre}
          </h3>
          <p className="text-sm font-bold text-black mt-1">
            {formatPrice(product.precio)}
          </p>
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={totalStock === 0 || added}
          className={`w-full mt-2 font-bold tracking-widest py-3 flex items-center justify-center gap-2 transition-opacity hover:opacity-80 disabled:opacity-50 uppercase text-[10px] ${
            added ? 'bg-green-600 text-white cursor-default' : 'bg-black text-white disabled:cursor-not-allowed'
          }`}
        >
          {added ? '¡Agregado!' : totalStock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  )
}
