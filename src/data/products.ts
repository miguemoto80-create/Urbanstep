import { Product } from '../types'

export const initialProducts: Product[] = [
  {
    id: '1',
    nombre: 'Air Max 90',
    precio: 3299,
    marca: 'Nike',
    imagen_url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop',
    descripcion: 'El icónico Air Max 90 combina el estilo retro con la comodidad moderna. Su unidad Air visible proporciona amortiguación excepcional para todo el día.',
    stock_por_talla: { '38': 5, '39': 10, '40': 0, '42': 5 },
    categoria: 'Running'
  },
  {
    id: '2',
    nombre: 'Ultraboost 22',
    precio: 3899,
    marca: 'Adidas',
    imagen_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
    descripcion: 'La tecnología Boost ofrece el retorno de energía más increíble. Diseñado para corredores que buscan rendimiento y estilo.',
    stock_por_talla: { '38': 2, '39': 5, '40': 5, '42': 0 },
    categoria: 'Running'
  },
  {
    id: '3',
    nombre: 'Jordan 1 Retro High',
    precio: 4299,
    marca: 'Jordan',
    imagen_url: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop',
    descripcion: 'Un clásico atemporal que definió la cultura sneaker. El Jordan 1 es más que un zapato, es una declaración de estilo.',
    stock_por_talla: { '38': 0, '39': 0, '40': 4, '42': 4 },
    categoria: 'Lifestyle'
  },
  {
    id: '4',
    nombre: 'Classic Leather',
    precio: 1899,
    marca: 'Reebok',
    imagen_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
    descripcion: 'El diseño minimalista y elegante que nunca pasa de moda. Perfecto para uso diario con máxima comodidad.',
    stock_por_talla: { '38': 5, '39': 5, '40': 5, '42': 5 },
    categoria: 'Lifestyle'
  },
  {
    id: '5',
    nombre: 'RS-X Bold',
    precio: 2599,
    marca: 'Puma',
    imagen_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
    descripcion: 'Estilo chunky con colores vibrantes. La tecnología RS proporciona amortiguación superior y un look único.',
    stock_por_talla: { '38': 0, '39': 5, '40': 5, '42': 0 },
    categoria: 'Lifestyle'
  },
  {
    id: '6',
    nombre: 'Chuck Taylor All Star',
    precio: 1299,
    marca: 'Converse',
    imagen_url: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&h=600&fit=crop',
    descripcion: 'El sneaker más icónico de todos los tiempos. Simple, versátil y siempre de moda.',
    stock_por_talla: { '38': 10, '39': 5, '40': 5, '42': 5 },
    categoria: 'Lifestyle'
  },
  {
    id: '7',
    nombre: 'Gel-Kayano 29',
    precio: 3599,
    marca: 'Asics',
    imagen_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop',
    descripcion: 'Diseñado para corredores con sobrepronación. Estabilidad y amortiguación de primer nivel.',
    stock_por_talla: { '38': 2, '39': 2, '40': 5, '42': 5 },
    categoria: 'Running'
  },
  {
    id: '8',
    nombre: 'Fresh Foam 1080v12',
    precio: 3199,
    marca: 'New Balance',
    imagen_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop',
    descripcion: 'La máxima expresión de comodidad para correr largas distancias. Fresh Foam te lleva más lejos.',
    stock_por_talla: { '38': 1, '39': 0, '40': 5, '42': 5 },
    categoria: 'Running'
  }
]

export const brands = ['Nike', 'Adidas', 'Jordan', 'Reebok', 'Puma', 'Converse', 'Asics', 'New Balance']
export const categories = ['Running', 'Lifestyle', 'Training', 'Basketball']
