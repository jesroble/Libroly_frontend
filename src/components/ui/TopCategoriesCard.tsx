import React from 'react';

const TopCategoriesCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-coral-500 to-coral-600">
      <div className="aspect-square flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Explora Nuestras Categorías Principales
          </h2>
          <button className="mt-2 px-4 py-1.5 text-sm bg-white text-coral-600 rounded-full hover:bg-gray-100 transition-colors">
            Ver Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesCard;