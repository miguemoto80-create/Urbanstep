import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { formatPrice, cn } from '../lib/utils'
import ProductCard from '../components/ProductCard'

export default function DetalleProducto() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, getProductById } = useProducts()
  const { addToCart, items } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const product = getProductById(id || '')

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const sizes = Object.keys(product.stock_por_talla || {})
  const totalStock = Object.values(product.stock_por_talla || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0)
  
  const cartItem = selectedSize ? items.find((item) => item.id === product.id && item.talla === selectedSize) : null
  const currentStock = selectedSize ? product.stock_por_talla[selectedSize] : 0
  const maxQuantity = currentStock - (cartItem?.cantidad || 0)

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addToCart(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    setQuantity(1)
  }

  const relatedProducts = products
    .filter((p) => p.marca === product.marca && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      {/* Product Details */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {product.marca}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.nombre}
          </h1>
          <p className="mt-4 text-4xl font-bold">{formatPrice(product.precio)}</p>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.descripcion}</p>

          {/* Stock Status */}
          <div className="mt-6">
            {totalStock > 5 ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                <Check className="h-4 w-4" />
                En stock
              </span>
            ) : totalStock > 0 ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-500">
                <Check className="h-4 w-4" />
                Últimas unidades
              </span>
            ) : (
              <span className="text-sm font-medium text-destructive">Agotado</span>
            )}
          </div>
          
          {/* Size Selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Talla (EU)</label>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {sizes.map((size) => {
                const stock = product.stock_por_talla[size]
                const isOutOfStock = stock === 0
                return (
                  <button
                    key={size}
                    onClick={() => {
                      if (!isOutOfStock) {
                        setSelectedSize(size)
                        setQuantity(1)
                      }
                    }}
                    disabled={isOutOfStock}
                    className={cn(
                      'flex h-12 items-center justify-center rounded-lg border text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isOutOfStock
                          ? 'border-border bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed line-through'
                          : 'border-border bg-background hover:border-primary hover:bg-muted'
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
            {selectedSize && (
              <p className="mt-2 text-sm text-muted-foreground">
                Stock disponible en talla {selectedSize}: {currentStock}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          {selectedSize && maxQuantity > 0 && (
            <div className="mt-8">
              <label className="text-sm font-medium">Cantidad</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-muted"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-muted"
                    disabled={quantity >= maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || maxQuantity <= 0 || totalStock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Agregado al carrito
                </>
              ) : !selectedSize ? (
                'Selecciona una talla'
              ) : maxQuantity <= 0 ? (
                'Máximo en el carrito'
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 grid gap-4 border-t border-border pt-10 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Envío gratis</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">100% auténtico</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30 días devolución</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">Más de {product.marca}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
