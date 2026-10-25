import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const randomBookQuotes = [
    "¡Vaya! Parece que este libro se ha perdido entre las estanterías.",
    "Esta página se ha convertido en un libro fantasma.",
    "¡Ups! Este capítulo parece estar en otro tomo.",
    "404: El marcador se ha extraviado.",
    "Esta página está tan perdida como los calcetines en la lavadora."
  ];

  const getRandomQuote = () => {
    return randomBookQuotes[Math.floor(Math.random() * randomBookQuotes.length)];
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Ilustración o animación */}
        <div className="mb-8 relative">
          <div className="w-48 h-64 mx-auto bg-white rounded-lg shadow-lg transform -rotate-12 absolute left-1/2 -translate-x-1/2 -translate-y-4">
            <div className="h-full border-r-4 border-gray-100"></div>
          </div>
          <div className="w-48 h-64 mx-auto bg-coral-500 rounded-lg shadow-lg transform rotate-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-9xl font-bold opacity-50">?</span>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        <div className="bg-white rounded-xl shadow-lg p-8 relative z-10">
          <h1 className="text-6xl font-bold text-coral-500 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">{getRandomQuote()}</p>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              No te preocupes, tenemos otras grandes historias para ti:
            </p>
            
            {/* Sugerencias de navegación */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link 
                to="/"
                className="flex items-center px-6 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-home mr-2"></i>
                Inicio
              </Link>
              <Link 
                to="/books"
                className="flex items-center px-6 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-book mr-2"></i>
                Explorar libros
              </Link>
              <Link 
                to="/blog"
                className="flex items-center px-6 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-newspaper mr-2"></i>
                Blog
              </Link>
            </div>

            {/* Botón de búsqueda */}
            <div>
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
              >
                <i className="fas fa-search mr-2"></i>
                Buscar un libro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
