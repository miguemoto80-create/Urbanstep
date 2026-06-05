import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'cliente',
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.estado) {
      return res.status(401).json({ error: 'Credenciales inválidas o usuario inactivo' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET || 'supersecret_key_urbanstep',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
