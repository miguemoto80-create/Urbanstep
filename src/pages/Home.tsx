import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import DropCountdown from '../components/DropCountdown'
import RaffleSection from '../components/RaffleSection'
import { useProducts } from '../context/ProductContext'

export default function Home() {
  const { products } = useProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-7xl lg:text-8xl">
                Eleva
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">Tu Estilo</span>
              </h1>
              <p className="mt-8 text-xl font-medium text-muted-foreground max-w-lg">
                La colección más exclusiva de sneakers premium. Curada para el amante moderno del streetwear.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center justify-center bg-foreground text-background px-10 py-5 text-sm font-bold tracking-widest uppercase transition-transform hover:-translate-y-1"
                >
                  Comprar Ahora
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center justify-center border-2 border-border bg-transparent px-10 py-5 text-sm font-bold tracking-widest uppercase transition-colors hover:bg-muted"
                >
                  Nuevos Lanzamientos
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1000&h=1200&fit=crop"
                  alt="Sneaker destacado"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-8 border border-border">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Destacado</p>
                <p className="text-4xl font-black">$1,299</p>
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
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-bold tracking-widest uppercase text-muted-foreground mb-12">Distribuidor Autorizado De</h2>
          <div className="flex flex-wrap items-center justify-center gap-16">
            {['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance', 'Converse'].map((brand) => (
              <Link
                key={brand}
                to={`/catalogo?marca=${brand}`}
                className="text-3xl sm:text-4xl font-black uppercase text-foreground/30 transition-all hover:text-foreground hover:scale-105"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Drops Countdown */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <DropCountdown 
          title="Nike SB Dunk Low 'Born X Raised'" 
          targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()} 
          imageUrl="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&h=800&fit=crop"
        />
      </section>

      {/* Raffle Section */}
      <RaffleSection />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-foreground text-background px-8 py-24 text-center sm:px-16 flex flex-col items-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl max-w-2xl">
            Únete A La Cultura Urban Step
          </h2>
          <p className="mt-6 max-w-xl text-background/80 font-medium">
            Sé el primero en conocer sobre nuevos lanzamientos, ofertas exclusivas y lo último del mundo sneaker.
          </p>
          <div className="mt-10 flex flex-col w-full max-w-md gap-4">
            <input
              type="email"
              placeholder="TU CORREO ELECTRÓNICO"
              className="w-full bg-transparent border-b-2 border-background/30 px-4 py-4 text-center text-background placeholder:text-background/50 focus:border-background focus:outline-none uppercase tracking-widest text-sm"
            />
            <button className="w-full bg-background text-foreground px-8 py-5 font-bold tracking-widest uppercase hover:bg-background/90 transition-colors text-sm mt-4">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
