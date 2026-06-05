import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Hasheado
  },
  rol: {
    type: DataTypes.ENUM('admin', 'cliente'),
    defaultValue: 'cliente',
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // true = activo, false = inactivo
  },
});

export default User;
