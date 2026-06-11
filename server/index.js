import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import reviewRoutes from './routes/review.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Review from './models/Review.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Sync Database and Start Server
sequelize.sync({ force: true }) // Regenerate database for SKU update
  .then(async () => {
    console.log('Base de datos sincronizada y regenerada.');

    // --- SEEDER: Productos Iniciales ---
    const productCount = await Product.count();
    if (productCount === 0) {
      const initialProducts = [
        {
          codigo_unico: 'NK-AM90-01',
          nombre: 'Air Max 90',
          precio: 3299,
          marca: 'Nike',
          imagen_url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop',
          descripcion: 'El icónico Air Max 90 combina el estilo retro con la comodidad moderna. Su unidad Air visible proporciona amortiguación excepcional para todo el día.',
          stock_por_talla: { '38': 5, '39': 10, '40': 0, '42': 5 },
          categoria: 'Running',
          color: 'Blanco'
        },
        {
          codigo_unico: 'AD-UB22-02',
          nombre: 'Ultraboost 22',
          precio: 3899,
          marca: 'Adidas',
          imagen_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
          descripcion: 'La tecnología Boost ofrece el retorno de energía más increíble. Diseñado para corredores que buscan rendimiento y estilo.',
          stock_por_talla: { '38': 2, '39': 5, '40': 5, '42': 0 },
          categoria: 'Running',
          color: 'Negro'
        },
        {
          codigo_unico: 'JD-R1H-03',
          nombre: 'Jordan 1 Retro High',
          precio: 4299,
          marca: 'Jordan',
          imagen_url: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop',
          descripcion: 'Un clásico atemporal que definió la cultura sneaker. El Jordan 1 es más que un zapato, es una declaración de estilo.',
          stock_por_talla: { '38': 0, '39': 0, '40': 4, '42': 4 },
          categoria: 'Lifestyle',
          color: 'Rojo'
        },
        {
          codigo_unico: 'RB-CL-04',
          nombre: 'Classic Leather',
          precio: 1899,
          marca: 'Reebok',
          imagen_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
          descripcion: 'El diseño minimalista y elegante que nunca pasa de moda. Perfecto para uso diario con máxima comodidad.',
          stock_por_talla: { '38': 5, '39': 5, '40': 5, '42': 5 },
          categoria: 'Lifestyle',
          color: 'Blanco'
        },
        {
          codigo_unico: 'PM-RSX-05',
          nombre: 'RS-X Bold',
          precio: 2599,
          marca: 'Puma',
          imagen_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
          descripcion: 'Estilo chunky con colores vibrantes. La tecnología RS proporciona amortiguación superior y un look único.',
          stock_por_talla: { '38': 0, '39': 5, '40': 5, '42': 0 },
          categoria: 'Lifestyle',
          color: 'Multicolor'
        },
        {
          codigo_unico: 'CV-CTAS-06',
          nombre: 'Chuck Taylor All Star',
          precio: 1299,
          marca: 'Converse',
          imagen_url: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&h=600&fit=crop',
          descripcion: 'El sneaker más icónico de todos los tiempos. Simple, versátil y siempre de moda.',
          stock_por_talla: { '38': 10, '39': 5, '40': 5, '42': 5 },
          categoria: 'Lifestyle',
          color: 'Azul'
        },
        {
          codigo_unico: 'AS-GK29-07',
          nombre: 'Gel-Kayano 29',
          precio: 3599,
          marca: 'Asics',
          imagen_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop',
          descripcion: 'Diseñado para corredores con sobrepronación. Estabilidad y amortiguación de primer nivel.',
          stock_por_talla: { '38': 2, '39': 2, '40': 5, '42': 5 },
          categoria: 'Running',
          color: 'Gris'
        },
        {
          codigo_unico: 'NB-FF10-08',
          nombre: 'Fresh Foam 1080v12',
          precio: 3199,
          marca: 'New Balance',
          imagen_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop',
          descripcion: 'La máxima expresión de comodidad para correr largas distancias. Fresh Foam te lleva más lejos.',
          stock_por_talla: { '38': 1, '39': 0, '40': 5, '42': 5 },
          categoria: 'Running',
          color: 'Gris'
        }
      ];
      await Product.bulkCreate(initialProducts);
      console.log('Seeder: Productos iniciales creados exitosamente.');
    }

    // --- SEEDER: Crear Admin Master ---
    const adminEmail = 'admin@urbanstep.com';
    const adminExists = await User.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('adminadmin', salt);
      await User.create({
        nombre: 'Administrador Master',
        email: adminEmail,
        password: hashedPassword,
        rol: 'admin',
      });
      console.log('Seeder: Administrador master creado exitosamente.');
    } else {
      console.log('Seeder: El administrador master ya existe.');
    }

    // --- SEEDER: Crear Reseñas de prueba ---
    const reviewCount = await Review.count();
    if (reviewCount === 0) {
      const customerEmail = 'cliente@urbanstep.com';
      let customer = await User.findOne({ where: { email: customerEmail } });
      if (!customer) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('cliente123', salt);
        customer = await User.create({
          nombre: 'Cliente Frecuente',
          email: customerEmail,
          password: hashedPassword,
          rol: 'cliente',
        });
      }
      const products = await Product.findAll();
      if (products.length > 0) {
        await Review.bulkCreate([
          {
            comentario: '¡Excelente producto! Muy cómodos y el diseño es brutal.',
            calificacion: 5,
            usuarioId: customer.id,
            productoId: products[0].id
          },
          {
            comentario: 'El envío fue súper rápido. La talla corre un poco pequeña, pedir media más grande.',
            calificacion: 4,
            usuarioId: customer.id,
            productoId: products[0].id
          }
        ]);
        console.log('Seeder: Reseñas de prueba creadas exitosamente.');
      }
    }
    // ---------------------------------
    // ---------------------------------

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
