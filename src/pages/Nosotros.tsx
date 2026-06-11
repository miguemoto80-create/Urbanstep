import React from 'react';

export default function Nosotros() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 text-center">Sobre Nosotros</h1>
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810baa3?w=800&h=600&fit=crop" 
            alt="Nuestra historia" 
            className="w-full grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase">Nuestra Historia</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Urban Step nació en 2020 de la pasión por la cultura sneaker y el streetwear. Comenzamos como un pequeño colectivo de coleccionistas y nos hemos convertido en el principal destino para encontrar los modelos más exclusivos y codiciados del mercado.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Nuestra obsesión por el detalle, la autenticidad y el diseño nos distingue. No solo vendemos zapatos; vendemos piezas de arte que puedes usar.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-24">
        <div className="bg-muted p-8 text-center border border-border">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Nuestra Misión</h3>
          <p className="text-muted-foreground">Democratizar el acceso a la moda urbana de alta gama, garantizando productos 100% auténticos a nuestra comunidad.</p>
        </div>
        <div className="bg-foreground text-background p-8 text-center border border-border">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Nuestra Visión</h3>
          <p className="text-background/80">Ser la plataforma líder mundial en la cultura sneaker, estableciendo los estándares de servicio, confianza y estilo.</p>
        </div>
        <div className="bg-muted p-8 text-center border border-border">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Nuestros Valores</h3>
          <p className="text-muted-foreground">Autenticidad, innovación constante, comunidad y obsesión por la satisfacción de nuestros clientes.</p>
        </div>
      </div>
    </div>
  );
}
