import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado, token no proveído' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_key_urbanstep');
    req.user = decoded; // { id, rol, ... }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Acceso denegado, se requieren permisos de administrador' });
  }
};
