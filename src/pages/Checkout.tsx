import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function Checkout() {
  const { items: cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre_cliente: '',
    email_cliente: '',
    direccion: '',
    metodo_pago: 'tarjeta'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders/checkout', {
        // Asume que estamos usando fetch directamente o podemos usar axios
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          total: totalPrice,
          items: cart,
          UserId: 1 // Si hay auth, usaríamos el ID real, pero para mockup está bien
        })
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }

      const data = await response.json();
      
      toast.success('¡Compra realizada con éxito!');
      clearCart();
      
      // Redirigir a la vista de la factura
      navigate(`/invoice/${data.order.id}`);

    } catch (error) {
      toast.error('Hubo un problema al procesar tu compra.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-heading mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/productos')} className="bg-primary text-black px-6 py-3 font-bold uppercase rounded hover:bg-white transition-colors">
          Ir a comprar
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-heading mb-8 neon-text">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border">
          <h2 className="text-2xl font-heading mb-6">Datos de Envío y Pago</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Nombre Completo</label>
              <input 
                type="text" 
                name="nombre_cliente"
                required
                value={formData.nombre_cliente}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
                placeholder="Juan Pérez"
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                name="email_cliente"
                required
                value={formData.email_cliente}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Dirección de Envío</label>
              <input 
                type="text" 
                name="direccion"
                required
                value={formData.direccion}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
                placeholder="Av. Siempre Viva 123"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Método de Pago</label>
              <select 
                name="metodo_pago"
                value={formData.metodo_pago}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none"
              >
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="paypal">PayPal</option>
                <option value="efectivo">Efectivo contra entrega</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold uppercase py-4 rounded-lg mt-6 hover:opacity-80 transition-opacity flex justify-center items-center gap-2"
            >
              Confirmar y Pagar ${totalPrice}
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border h-fit">
          <h2 className="text-2xl font-heading mb-6">Resumen del Pedido</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-background rounded-lg overflow-hidden border border-border">
                    <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.nombre}</h3>
                    <p className="text-sm text-muted-foreground">Talla: {item.talla} | Cant: {item.cantidad}</p>
                  </div>
                </div>
                <span className="font-bold text-primary">${item.precio * item.cantidad}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-4 flex justify-between items-center text-xl">
            <span className="font-bold">Total a Pagar</span>
            <span className="font-heading neon-text">${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
