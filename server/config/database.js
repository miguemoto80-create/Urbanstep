import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configura las credenciales de tu base de datos aquí o mediante archivo .env
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'urbanstep',
      process.env.DB_USER || 'root',
      process.env.DB_PASS || '',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
      }
    );

export default sequelize;
