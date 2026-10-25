import React, { useEffect, useState } from 'react';
import BookCard from '../ui/BookCard';
import { api } from '../../services/api';
import type { Book } from '../../types';
import { Link } from 'react-router-dom';

const NewReleasesSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await api.getNewReleases();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Novedades recién llegadas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestras últimas adquisiciones y descubre nuevas historias para tu colección
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {books && books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.isbn}
                  libro={book}
                />
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">Cargando libros...</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to='/books' className="bg-coral-500 text-white px-8 py-3 rounded-md hover:bg-coral-600 transition-colors">
              Ver más novedades
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewReleasesSection;