import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DropCountdown({ targetDate, title, imageUrl }: { targetDate: string, title: string, imageUrl: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl">
      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit mb-6">
            <Clock className="h-4 w-4" />
            Próximo Lanzamiento (Drop)
          </div>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h3>
          <p className="text-muted-foreground mb-8">
            Prepárate para el lanzamiento más exclusivo de la temporada. Unidades limitadas.
          </p>
          
          <div className="flex gap-4">
            <div className="flex flex-col items-center bg-muted/50 rounded-xl p-4 min-w-[80px]">
              <span className="text-3xl font-bold font-mono">{timeLeft.days}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Días</span>
            </div>
            <div className="flex flex-col items-center bg-muted/50 rounded-xl p-4 min-w-[80px]">
              <span className="text-3xl font-bold font-mono">{timeLeft.hours}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Hrs</span>
            </div>
            <div className="flex flex-col items-center bg-muted/50 rounded-xl p-4 min-w-[80px]">
              <span className="text-3xl font-bold font-mono">{timeLeft.minutes}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Min</span>
            </div>
            <div className="flex flex-col items-center bg-primary rounded-xl p-4 min-w-[80px] text-primary-foreground shadow-lg shadow-primary/20">
              <span className="text-3xl font-bold font-mono">{timeLeft.seconds}</span>
              <span className="text-xs uppercase tracking-wider">Seg</span>
            </div>
          </div>
          
          <button className="mt-8 rounded-full bg-foreground text-background font-semibold py-4 px-8 transition-transform hover:scale-105 active:scale-95 w-fit">
            Notificarme
          </button>
        </div>
        <div className="relative h-64 md:h-auto">
          <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-card/80"></div>
        </div>
      </div>
    </div>
  );
}
