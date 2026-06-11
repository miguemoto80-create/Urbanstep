import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tight uppercase">Urban Step</h3>
            <p className="text-muted-foreground text-sm">
              La colección más exclusiva de sneakers premium. Curada para el amante moderno del streetwear.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalogo" className="hover:text-foreground transition-colors">Catálogo</Link></li>
              <li><Link to="/nosotros" className="hover:text-foreground transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog & Noticias</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contacto" className="hover:text-foreground transition-colors">Contacto</Link></li>
              <li><Link to="/contacto" className="hover:text-foreground transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link to="/contacto" className="hover:text-foreground transition-colors">Guía de Tallas</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Pago Seguro</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <span>SSL SECURE CHECKOUT</span>
              </div>
              <div className="flex flex-wrap gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Mocking payment logos with text/icons or simple badges */}
                <span className="bg-background px-2 py-1 text-xs font-bold border border-border rounded">VISA</span>
                <span className="bg-background px-2 py-1 text-xs font-bold border border-border rounded">Mastercard</span>
                <span className="bg-background px-2 py-1 text-xs font-bold border border-border rounded">PayPal</span>
                <span className="bg-background px-2 py-1 text-xs font-bold border border-border rounded">Amex</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Urban Step. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="/nosotros" className="hover:text-foreground transition-colors">Política de Privacidad</Link>
            <Link to="/nosotros" className="hover:text-foreground transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
