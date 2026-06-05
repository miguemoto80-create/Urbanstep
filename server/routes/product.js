import express from 'express';
import sequelize from '../config/database.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Obtener todos los productos (Público)
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
});

// CRUD Productos (Solo Admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    
    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Checkout con Transacción (Usuarios Autenticados)
router.post('/checkout', authMiddleware, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items, total } = req.body; // items: [{ productId, size, quantity }]

    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) {
        throw new Error(`Producto ${item.productId} no encontrado`);
      }

      let stock = product.stock_por_talla;
      while (typeof stock === 'string') {
        try { stock = JSON.parse(stock); } catch (e) { stock = {}; break; }
      }

      if (!stock[item.size] || stock[item.size] < item.quantity) {
        throw new Error(`Stock insuficiente para el producto ${product.nombre} en talla ${item.size}`);
      }

      // Restar stock
      stock[item.size] -= item.quantity;
      
      // Sequelize no detecta cambios en campos JSON anidados a menos que los reasignes
      product.stock_por_talla = { ...stock }; 
      await product.save({ transaction: t });
    }

    const order = await Order.create({
      total,
      UserId: req.user.id,
      items
    }, { transaction: t });

    await t.commit();

    try {
      const user = await User.findByPk(req.user.id);
      if (user && user.email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const itemsHtml = items.map(item => `<li>Producto ID: ${item.productId} | Talla: ${item.size} | Cantidad: ${item.quantity}</li>`).join('');

        await transporter.sendMail({
          from: `"Urban Step" <${process.env.SMTP_USER || 'no-reply@urbanstep.com'}>`,
          to: user.email,
          subject: `Confirmación de Orden #${order.id} - Urban Step`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h1 style="color: #000;">¡Gracias por tu compra, ${user.nombre}!</h1>
              <p style="color: #555; font-size: 16px;">Tu orden ha sido procesada exitosamente y ya estamos preparando tus sneakers.</p>
              
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Resumen de la orden #${order.id}:</h3>
              <ul style="list-style: none; padding-left: 0; color: #333;">
                ${itemsHtml}
              </ul>
              
              <h2 style="color: #000; text-align: right; margin-top: 20px;">Total pagado: $${total}</h2>
              <br/>
              <p style="color: #777; font-size: 14px; text-align: center;">Te notificaremos cuando tu pedido esté en camino. ¡Disfruta tu nuevo estilo!</p>
            </div>
          `
        });
        console.log(`Correo enviado exitosamente a ${user.email} para la orden #${order.id}`);
      }
    } catch (emailError) {
      console.error('Atención: La compra fue exitosa pero falló el envío del correo de confirmación. Asegúrate de configurar SMTP_USER y SMTP_PASS en el archivo .env.', emailError.message);
    }

    res.status(201).json({ message: 'Compra realizada con éxito', order });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

export default router;
