import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductContext'

export default function Home() {
  const { products } = useProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-muted to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Eleva tu
                <span className="block text-primary">estilo urbano</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Descubre la colección más exclusiva de sneakers premium. Cada par cuenta una historia, cada paso define tu estilo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
                >
                  Explorar Catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Nuevos Lanzamientos
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop"
                  alt="Sneaker destacado"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-6 shadow-xl">
                <p className="text-sm text-muted-foreground">Desde</p>
                <p className="text-3xl font-bold">$1,299</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Envío Gratis</h3>
                <p className="text-sm text-muted-foreground">En compras mayores a $2,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">100% Auténtico</h3>
                <p className="text-sm text-muted-foreground">Garantía de autenticidad</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Devoluciones</h3>
                <p className="text-sm text-muted-foreground">30 días para cambios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Productos Destacados</h2>
            <p className="mt-2 text-muted-foreground">
              Los sneakers más populares de nuestra colección
            </p>
          </div>
          <Link
            to="/catalogo"
            className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver todos los productos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Brands Section */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-semibold">Marcas Premium</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
            {['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance', 'Converse'].map((brand) => (
              <span
                key={brand}
                className="text-2xl font-bold text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Únete a la comunidad Urban Step
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Sé el primero en conocer nuevos lanzamientos, ofertas exclusivas y novedades del mundo sneaker.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="w-full max-w-sm rounded-full bg-white/10 px-6 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/20 focus:outline-none sm:w-auto"
            />
            <button className="w-full rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-white/90 sm:w-auto">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
