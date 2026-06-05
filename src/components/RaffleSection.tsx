import { useState } from 'react';
import { Ticket } from 'lucide-react';
import { toast } from 'sonner';

export default function RaffleSection() {
  const [participated, setParticipated] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  
  const handleParticipate = () => {
    const number = Math.floor(Math.random() * 1000) + 1;
    setTicketNumber(number);
    setParticipated(true);
    toast.success('¡Inscripción exitosa!', {
      description: `Tu número de rifa es #${number}. ¡Mucha suerte!`,
      duration: 5000,
      className: 'bg-card border border-primary text-foreground',
    });
  };

  return (
    <section className="py-20 bg-muted/20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Sorteos Exclusivos</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Participa en nuestras rifas para tener la oportunidad de comprar los sneakers más limitados a precio de retail. Solo para miembros de la comunidad Urbanstep.
            </p>
            
            <div className="bg-card border border-border p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Travis Scott x Jordan 1 Low 'Olive'</h3>
                  <p className="text-sm text-muted-foreground mb-4">Cierre de inscripciones en 48 horas.</p>
                  
                  {participated ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Estás participando</p>
                        <p className="text-xs text-muted-foreground mt-1">Te notificaremos por correo si ganas.</p>
                      </div>
                      <div className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                        #{ticketNumber}
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleParticipate}
                      className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground font-semibold py-3 px-6 transition-all hover:bg-primary/90 hover:shadow-lg"
                    >
                      Obtener Número de Rifa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="aspect-video lg:aspect-square overflow-hidden rounded-3xl bg-muted shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=800&h=800&fit=crop" 
                alt="Travis Scott Jordan" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <span className="text-white font-bold text-2xl drop-shadow-md">RAFFLE IS LIVE</span>
              </div>
            </div>
            
            {/* Elemento decorativo */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM4ODgiLz48L3N2Zz4=')] opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
