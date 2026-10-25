import React, { useState } from 'react';
import BlogCard from '../components/ui/BlogCard';
import type { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "El impacto ambiental de la lectura digital vs. tradicional",
      excerpt: "Un análisis profundo sobre cómo nuestros hábitos de lectura afectan al medio ambiente. Descubre cuál es la opción más sostenible y cómo podemos reducir nuestra huella de carbono mientras disfrutamos de la lectura.",
      imageUrl: "/images/reading.png",
      date: "29 mayo 2025",
      category: "Sostenibilidad",
      readTime: "5 min lectura"
    },
    {
      id: 2,
      title: "Beneficios de la compra-venta de libros de segunda mano",
      excerpt: "La reutilización de libros no solo es beneficiosa para el planeta, sino también para nuestra cultura y economía. Descubre cómo puedes formar parte de esta tendencia sostenible.",
      imageUrl: "/images/learning.png",
      date: "28 mayo 2025",
      category: "Economía Circular",
      readTime: "4 min lectura"
    },
    {
      id: 3,
      title: "Cómo mantener tus libros en buen estado",
      excerpt: "Guía práctica para conservar tus libros y maximizar su vida útil. Consejos expertos para el cuidado y mantenimiento de tu biblioteca personal.",
      imageUrl: "/images/Los_pilares_de_la_tierra.jpg",
      date: "27 mayo 2025",
      category: "Consejos",
      readTime: "6 min lectura"
    },
    {
      id: 4,
      title: "La evolución de las bibliotecas en la era digital",
      excerpt: "Las bibliotecas se están transformando para adaptarse a la era digital. Descubre cómo estas instituciones están innovando para mantenerse relevantes.",
      imageUrl: "/images/signup_bg.png",
      date: "26 mayo 2025",
      category: "Tecnología",
      readTime: "7 min lectura"
    },
    {
      id: 5,
      title: "Comunidades lectoras: Conectando a través de los libros",
      excerpt: "Cómo las comunidades de lectura están creando conexiones significativas y promoviendo la sostenibilidad a través del intercambio de libros.",
      imageUrl: "/images/login_bg.png",
      date: "25 mayo 2025",
      category: "Comunidad",
      readTime: "5 min lectura"
    }
  ];

  const categories = ['Todos', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = activeCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category
                  ? 'bg-coral-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-coral-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No hay artículos en esta categoría por el momento.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
