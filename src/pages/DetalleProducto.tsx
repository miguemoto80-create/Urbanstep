import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Truck, Shield, RefreshCw, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice, cn } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import SizeGuideModal from '../components/SizeGuideModal'

export default function DetalleProducto() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, getProductById } = useProducts()
  const { addToCart, items } = useCart()
  const { user } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  
  const [reviews, setReviews] = useState<any[]>([])
  const [newReviewText, setNewReviewText] = useState('')
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const product = getProductById(id || '')

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:5000/api/reviews/product/${product.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setReviews(data)
        })
        .catch(console.error)
    }
  }, [product?.id])

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReviewText.trim() || !user) return
    setIsSubmittingReview(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productoId: product?.id,
          comentario: newReviewText,
          calificacion: newReviewRating
        })
      })
      if (res.ok) {
        const newReview = await res.json()
        setReviews([newReview, ...reviews])
        setNewReviewText('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmittingReview(false)
    }
  }

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
  
  const rating = (parseInt(product.id || '1') % 2) + 4;
  const reviewCount = parseInt(product.id || '1') * 24;

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
        <div className="bg-muted p-12">
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col py-8">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
              {product.marca}
            </span>
            <span className="text-xs font-mono uppercase text-muted-foreground">
              SKU: {product.codigo_unico}
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tighter uppercase sm:text-5xl">
            {product.nombre}
          </h1>
          
          <div className="flex items-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-foreground text-foreground' : 'text-muted'}`} />
            ))}
            <span className="text-sm font-medium text-muted-foreground ml-2">{rating}.0 ({reviewCount} Reseñas)</span>
          </div>

          <p className="mt-8 text-5xl font-black">{formatPrice(product.precio)}</p>

          <p className="mt-8 text-muted-foreground leading-relaxed text-lg">{product.descripcion}</p>

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
              <SizeGuideModal />
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
                      'flex h-12 items-center justify-center border-2 text-sm font-bold transition-all',
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : isOutOfStock
                          ? 'border-border bg-transparent text-muted-foreground opacity-30 cursor-not-allowed line-through'
                          : 'border-border bg-transparent hover:border-foreground'
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
              className="flex flex-1 items-center justify-center gap-2 bg-foreground text-background py-5 font-black uppercase tracking-widest transition-transform hover:scale-[1.02] disabled:bg-muted disabled:text-muted-foreground disabled:hover:scale-100 disabled:cursor-not-allowed text-sm"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Agregado al Carrito
                </>
              ) : !selectedSize ? (
                'Seleccionar Talla'
              ) : maxQuantity <= 0 ? (
                'Máximo en Carrito'
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al Carrito
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

      {/* Reviews Section */}
      <section className="mt-20 border-t border-border pt-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Reseñas</h2>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-5xl font-black">{reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.calificacion, 0) / reviews.length).toFixed(1) : '0.0'}</span>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.calificacion, 0) / reviews.length) : 0) ? 'fill-foreground text-foreground' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{reviews.length} opiniones</span>
              </div>
            </div>

            {user ? (
              <form onSubmit={submitReview} className="space-y-4 bg-muted/30 p-6 border border-border">
                <h3 className="font-bold uppercase tracking-widest text-sm">Deja tu opinión</h3>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Calificación</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setNewReviewRating(star)}>
                        <Star className={`w-6 h-6 transition-colors ${star <= newReviewRating ? 'fill-foreground text-foreground' : 'text-muted hover:text-foreground/50'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Comentario</label>
                  <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full bg-background border border-border p-3 text-sm focus:outline-none focus:border-foreground"
                    rows={4}
                    placeholder="¿Qué te pareció este producto?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingReview || !newReviewText.trim()}
                  className="w-full bg-foreground text-background py-3 text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 disabled:opacity-50"
                >
                  {isSubmittingReview ? 'Enviando...' : 'Enviar Reseña'}
                </button>
              </form>
            ) : (
              <div className="bg-muted p-6 border border-border text-center">
                <p className="text-sm mb-4">Debes iniciar sesión para dejar una reseña.</p>
                <Link to="/login" className="inline-block border border-foreground px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">Aún no hay reseñas para este producto. ¡Sé el primero en opinar!</p>
            ) : (
              reviews.map((review, idx) => (
                <div key={idx} className="border-b border-border pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm uppercase tracking-wider">{review.usuario?.nombre || 'Usuario'}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.calificacion ? 'fill-foreground text-foreground' : 'text-muted'}`} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed">{review.comentario}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

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
