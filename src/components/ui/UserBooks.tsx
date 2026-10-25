import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface UserBook {
  titulo: string;
  autor: string;
  urlImgPortada: string;
  fechaPublicacion: string;
  valoracion: number;
  descripcion: string;
  paginas: number;
  publisher: string;
  isbn: number;
}

interface UserBookCardProps {
  libro: UserBook;
}

const UserBookCard: React.FC<UserBookCardProps> = ({ libro }) => {
  const { titulo, autor, urlImgPortada, valoracion = 5 } = libro;
  const [imageError, setImageError] = useState(false);

  const getPlaceholderImage = () => {
    const bgColor = 'e2e8f0';
    const textColor = '1a1a1a';
    const text = encodeURIComponent(titulo.slice(0, 20) + (titulo.length > 20 ? '...' : ''));
    return `https://placehold.co/400x600/${bgColor}/${textColor}?text=${text}`;
  };

  return (
    <div className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 w-40 sm:w-44 md:w-48 xl:w-52 mx-auto">
        <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 min-h-[160px]">
          <img
            src={!imageError ? urlImgPortada : getPlaceholderImage()}
            alt={`Portada de ${titulo}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 max-h-56 sm:max-h-64 md:max-h-72 xl:max-h-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                to={`/book/${libro.isbn}`}
                className="bg-coral-500 text-white px-4 py-2 rounded-md hover:bg-coral-600 transition-colors text-sm"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
        <div className="p-3">
          <Link to={`/book/${libro.isbn}`}>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-coral-500 transition-colors">
              {titulo}
            </h3>
          </Link>
          <p className="text-gray-600 text-xs mb-2">{autor}</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${i < valoracion ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-xs">
              {libro.paginas} páginas
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(libro.fechaPublicacion).getFullYear()} • {libro.publisher}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookCard;