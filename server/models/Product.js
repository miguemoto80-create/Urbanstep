import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_unico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    defaultValue: 'Lifestyle',
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  stock_por_talla: {
    type: DataTypes.JSON, // Estructura: { "38": 10, "39": 5, "40": 0 }
    allowNull: false,
    defaultValue: {},
  },
});

export default Product;
