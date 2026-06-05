import express from 'express';
import sequelize from '../config/database.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

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

      const stock = product.stock_por_talla;
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
    res.status(201).json({ message: 'Compra realizada con éxito', order });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

export default router;
