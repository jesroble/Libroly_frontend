import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Genre } from '../../types';

interface CategoryCardProps {
  genre: Genre;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ genre }) => {
  const navigate = useNavigate();
  const { id, nombre } = genre;

  return (
    <div
      onClick={() => navigate(`/books?genre=${id}`)}
      className="bg-white border rounded-2xl p-6 text-center font-semibold text-lg cursor-pointer transition-all
                 border-[rgb(255,122,122)] text-[rgb(255,122,122)] hover:bg-[rgb(255,122,122)] hover:text-white"
    >
      {nombre}
    </div>
  );
};

export default CategoryCard;
