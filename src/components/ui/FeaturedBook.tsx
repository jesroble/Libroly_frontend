import React from 'react';

interface FeaturedBookProps {
  title: string;
  author: string;
  image: string;
  rating: number;
  description: string;
}

const FeaturedBook: React.FC<FeaturedBookProps> = ({ 
  title, 
  author, 
  image, 
  rating, 
  description 
}) => {
  return (
    <div className="featured-book bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="aspect-[3/4] relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <p className="text-sm text-gray-500 mb-2">Libro destacado de la semana</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">Por {author}</p>
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-6">{description}</p>
          <button className="bg-coral-500 text-white px-6 py-2 rounded-md hover:bg-coral-600 transition-colors">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;