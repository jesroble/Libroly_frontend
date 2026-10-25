import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Book } from '../../types';

const RandomBookSection: React.FC = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchRandomBook = async () => {
      try {
        const data = await api.getRandomBook();
        setBook(data);
      } catch (error) {
        console.error('Error fetching random book:', error);
      }
    };

    fetchRandomBook();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Te podría interesar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ¿Te sientes con suerte? Descubre una joya literaria seleccionada especialmente para ti
            </p>
          </div>

          {!book ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">Cargando libro aleatorio...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-6">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={book.urlImgPortada || 'https://placehold.co/400x600/e2e8f0/1a1a1a.png?text=Sin+Imagen'}
                      alt={book.titulo}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{book.titulo}</h3>
                  <p className="text-gray-600 text-lg mb-4">{book.autor}</p>
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${i < (book.valoracion || 0) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-medium">ISBN:</span>
                      <span>{book.isbn}</span>
                    </div>
                    {book.generoLiterario && book.generoLiterario.length > 0 && (
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">Categorías:</span>
                        <div className="flex flex-wrap gap-2">
                          {book.generoLiterario.map((genre) => (
                            <span 
                              key={genre.id}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {genre.nombre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => navigate(`/book/${book.isbn}`)}
                    className="mt-8 bg-coral-500 text-white px-8 py-3 rounded-md hover:bg-coral-600 transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RandomBookSection;