import { Link } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/utils'

export default function Carrito() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Parece que aún no has agregado ningún producto a tu carrito.
        </p>
        <Link
          to="/catalogo"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explorar productos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carrito de Compras</h1>
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6"
            >
              <Link
                to={`/producto/${item.id}`}
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-32"
              >
                <img
                  src={item.imagen_url}
                  alt={item.nombre}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.marca}
                  </span>
                  <Link
                    to={`/producto/${item.id}`}
                    className="mt-1 block font-semibold transition-colors hover:text-primary"
                  >
                    {item.nombre}
                  </Link>
                  <p className="mt-1 text-lg font-bold">{formatPrice(item.precio)}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-muted sm:h-10 sm:w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium sm:w-10">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-muted sm:h-10 sm:w-10"
                      disabled={item.cantidad >= item.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Resumen del pedido</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>{totalPrice >= 2000 ? 'Gratis' : formatPrice(99)}</span>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-xl">
                  {formatPrice(totalPrice + (totalPrice >= 2000 ? 0 : 99))}
                </span>
              </div>
            </div>
          </div>

          {totalPrice < 2000 && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Agrega {formatPrice(2000 - totalPrice)} más para envío gratis
            </p>
          )}

          <button className="mt-6 w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Proceder al pago
          </button>

          <Link
            to="/catalogo"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
