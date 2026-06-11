import express from 'express';
import Review from '../models/Review.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productoId: req.params.productId },
      include: [{ model: User, as: 'usuario', attributes: ['nombre'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// POST a new review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productoId, comentario, calificacion } = req.body;
    
    if (!comentario || !calificacion || !productoId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const review = await Review.create({
      productoId,
      usuarioId: req.user.id,
      comentario,
      calificacion
    });

    const reviewWithUser = await Review.findByPk(review.id, {
      include: [{ model: User, as: 'usuario', attributes: ['nombre'] }]
    });

    res.status(201).json(reviewWithUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
});

export default router;
