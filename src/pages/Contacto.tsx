import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contacto() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-center">Contacto</h1>
      <p className="text-center text-muted-foreground uppercase tracking-widest mb-16">Estamos aquí para ayudarte</p>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase mb-6">Información Directa</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-muted p-4"><MapPin className="w-6 h-6" /></div>
                <div>
                  <p className="font-bold uppercase">Ubicación</p>
                  <p className="text-muted-foreground">Calle Fashion 123, Distrito Sneaker, 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted p-4"><Phone className="w-6 h-6" /></div>
                <div>
                  <p className="font-bold uppercase">Teléfono</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted p-4"><Mail className="w-6 h-6" /></div>
                <div>
                  <p className="font-bold uppercase">Email</p>
                  <p className="text-muted-foreground">soporte@urbanstep.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-muted/30 p-8 border border-border">
          <h2 className="text-2xl font-black uppercase mb-6">Envíanos un mensaje</h2>
          {sent ? (
            <div className="bg-green-600 text-white p-6 text-center font-bold uppercase tracking-widest">
              ¡Mensaje enviado con éxito!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Nombre Completo</label>
                <input required type="text" className="w-full bg-background border border-border p-3 focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                <input required type="email" className="w-full bg-background border border-border p-3 focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Mensaje</label>
                <textarea required rows={5} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-foreground" />
              </div>
              <button type="submit" className="w-full bg-foreground text-background py-4 font-black uppercase tracking-widest hover:bg-foreground/90 transition-colors">
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
