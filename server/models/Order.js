import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Pendiente de Envío', 'Enviado', 'Entregado', 'Cancelado'),
    defaultValue: 'Pendiente de Envío',
  },
  items: {
    type: DataTypes.JSON, // Guardar array de productos comprados (id, talla, cantidad, precio)
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

User.hasMany(Order);
Order.belongsTo(User);

export default Order;
