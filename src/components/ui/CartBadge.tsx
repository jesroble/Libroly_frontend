// components/layout/CartBadge.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartBadge: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="relative p-2 text-gray-700 hover:text-coral-600 transition-colors duration-200"
    >
      {/* Ícono del carrito */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.65a1 1 0 00.7 1.71h12.2M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 4h8"
        />
      </svg>

      {/* Badge con el número de elementos */}
      {state.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {state.itemCount > 99 ? '99+' : state.itemCount}
        </span>
      )}
    </button>
  );
};

export default CartBadge;