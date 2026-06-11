import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  usuarioId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productoId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
});

// Relaciones
User.hasMany(Review, { foreignKey: 'usuarioId' });
Review.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

Product.hasMany(Review, { foreignKey: 'productoId' });
Review.belongsTo(Product, { foreignKey: 'productoId' });

export default Review;
