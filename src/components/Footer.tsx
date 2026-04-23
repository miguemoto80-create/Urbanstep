import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">US</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Urban Step</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu destino premium para sneakers de las mejores marcas del mundo.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Navegación</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-sm text-muted-foreground hover:text-foreground">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="text-sm text-muted-foreground hover:text-foreground">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Marcas</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">Nike</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Adidas</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Jordan</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">New Balance</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Síguenos</h3>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Urban Step Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
