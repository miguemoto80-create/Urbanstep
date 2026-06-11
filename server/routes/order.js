import express from 'express';
import Order from '../models/Order.js';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Crear un pedido
router.post('/checkout', async (req, res) => {
  try {
    const { items, total, direccion, metodo_pago, nombre_cliente, email_cliente, UserId } = req.body;

    const order = await Order.create({
      items,
      total,
      direccion,
      metodo_pago,
      nombre_cliente,
      email_cliente,
      UserId
    });

    res.status(201).json({ message: 'Pedido creado exitosamente', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
});

// Obtener un pedido y generar PDF
router.get('/invoice/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const doc = new PDFDocument({ margin: 50 });
    
    let itemsArray = [];
    if (typeof order.items === 'string') {
      try {
        itemsArray = JSON.parse(order.items);
      } catch(e) {
        itemsArray = [];
      }
    } else {
      itemsArray = order.items || [];
    }

    // Configurar encabezados para enviar el PDF
    res.setHeader('Content-disposition', `attachment; filename=factura-${order.id}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(25).text('URBANSTEP', { align: 'center' });
    doc.fontSize(10).text('Factura Electrónica', { align: 'center' });
    doc.moveDown(2);
    
    // Info del Cliente
    doc.fontSize(12).text(`Pedido #${order.id}`, { underline: true });
    doc.text(`Fecha: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Cliente: ${order.nombre_cliente}`);
    doc.text(`Email: ${order.email_cliente}`);
    doc.text(`Dirección: ${order.direccion}`);
    doc.text(`Método de Pago: ${order.metodo_pago}`);
    doc.text(`Estado: ${order.estado}`);
    doc.moveDown(2);

    // Tabla Header
    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('SKU', 50, tableTop);
    doc.text('Producto', 150, tableTop);
    doc.text('Talla', 350, tableTop);
    doc.text('Cant', 400, tableTop);
    doc.text('Precio', 450, tableTop);
    doc.text('Subtotal', 510, tableTop);
    
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    
    let y = tableTop + 25;
    doc.font('Helvetica');

    itemsArray.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      doc.text(item.codigo_unico || 'N/A', 50, y);
      doc.text(`${item.marca} ${item.nombre}`, 150, y, { width: 190 });
      doc.text(item.talla, 350, y);
      doc.text(item.cantidad.toString(), 400, y);
      doc.text(`$${item.precio}`, 450, y);
      doc.text(`$${subtotal}`, 510, y);
      y += 20;
    });

    doc.moveTo(50, y + 10).lineTo(550, y + 10).stroke();
    doc.moveDown(2);
    
    doc.font('Helvetica-Bold').fontSize(14);
    doc.text(`Total: $${order.total}`, 400, y + 25, { align: 'right' });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar la factura' });
  }
});

export default router;
