import React, { useEffect, useState } from 'react';
import CategoryCard from '../ui/CategoryCard';
import { api } from '../../services/api';
import type { Genre } from '../../types';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getGenres();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora nuestras categorías principales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre una amplia selección de libros en nuestras categorías más populares
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  genre={category}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">Cargando categorías...</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to='/books' className="bg-coral-500 text-white px-8 py-3 rounded-md hover:bg-coral-600 transition-colors">
              Ver todas las categorías
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;