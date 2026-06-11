import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí idealmente haríamos un fetch al backend para obtener la info de la orden.
    // Como el endpoint /api/orders/invoice/:id actualmente devuelve el PDF directamente,
    // podríamos crear un endpoint separado para los detalles, o simplemente mostrar 
    // un éxito general y el botón para descargar.
    // Simularemos la carga del estado por ahora para la demostración visual.
    
    setTimeout(() => {
      setOrder({ id });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/invoice/${id}`);
      if (!response.ok) throw new Error('Error al generar PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura-urbanstep-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Factura descargada exitosamente');
    } catch (error) {
      toast.error('No se pudo descargar la factura');
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 min-h-screen flex flex-col items-center">
      <div className="bg-card text-card-foreground border border-border rounded-3xl p-8 w-full text-center relative overflow-hidden">
        {/* Decoraciones neon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[100px] pointer-events-none"></div>
        
        <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
        
        <h1 className="text-4xl font-heading mb-2 neon-text">¡Pago Exitoso!</h1>
        <p className="text-muted-foreground mb-8">Tu pedido #{id} ha sido procesado correctamente y pronto estará en camino.</p>
        
        <div className="bg-background border border-border rounded-xl p-6 mb-8 text-left">
          <h3 className="font-bold text-lg mb-4 text-foreground">¿Qué sigue?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Recibirás un correo con la confirmación de tu pedido.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Te notificaremos cuando tu paquete sea enviado.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-foreground text-background font-bold px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
          >
            <Download className="w-5 h-5" />
            Descargar Factura PDF
          </button>
          
          <button 
            onClick={() => navigate('/productos')}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}
