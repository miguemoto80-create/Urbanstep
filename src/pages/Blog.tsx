import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Guía Definitiva para Limpiar tus Sneakers',
    date: '10 Jun 2026',
    category: 'Cuidado',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=400&fit=crop',
    excerpt: 'Descubre los mejores productos y técnicas para mantener tus pares como el primer día, sin dañar los materiales premium.'
  },
  {
    id: 2,
    title: 'Tendencias Streetwear: Lo que dominará el 2026',
    date: '05 Jun 2026',
    category: 'Tendencias',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?w=800&h=400&fit=crop',
    excerpt: 'El brutalismo y el minimalismo se apoderan de las calles. Análisis profundo de las marcas que están marcando la pauta.'
  },
  {
    id: 3,
    title: 'Cómo identificar un par de Air Max falsos',
    date: '28 May 2026',
    category: 'Guías',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=400&fit=crop',
    excerpt: 'Nuestra guía experta de autenticación. Aprende a revisar costuras, etiquetas y la caja original.'
  }
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-center">Urban Blog</h1>
      <p className="text-center text-muted-foreground uppercase tracking-widest mb-16">Noticias, Guías y Cultura Sneaker</p>

      <div className="grid gap-12 lg:grid-cols-3">
        {posts.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden mb-6 bg-muted">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h2 className="text-2xl font-black uppercase mb-4 group-hover:underline">{post.title}</h2>
            <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-transform group-hover:translate-x-2">
              Leer Más <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
