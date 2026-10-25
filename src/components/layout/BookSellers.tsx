import React from "react";
import type { Book } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface BookSellersProps {
    book: Book;
}

const BookSellers: React.FC<BookSellersProps> = ({ book }) => {
    const { user } = useAuth();

    const isOwnBook = (sellerId: string) => {
        return user?.id !== undefined && user.id.toString() === sellerId;
    };

    return (
        <div>
            <div className="flex justify-center hero-gradient p-6 text-blue-800 font-bold">
                {book.titulo}
            </div>
            <div className="p-6 px-10 mt-5 bg-white text-blue-800 font-bold">
                <span className="text-coral-500">INICIO</span> / <span className="text-coral-500">LIBROS</span> / {book.titulo}
            </div>

            {/* Principal */}
            <div className="flex justify-center items-center bg-white p-6 mt-8">
                {/* Book image */}
                <div className="flex flex-col text-center">
                    <img
                        src={book.urlImgPortada}
                        alt={`Portada de ${book.titulo}`}
                        className="rounded bg-white shadow-lg px-4 py-4 h-80 w-70"
                    />
                    <p className="text-xs text-blue-800 font-bold mt-3">{book.titulo}</p>
                    <p className="text-xs text-grey-300 mt-2">{book.autor}</p>
                </div>

                {/* Book sellers */}
                <div className="flex flex-col px-20">
                    <h1 className="font-bold text-black">Vendedores actuales</h1>
                    {!book.sellers || book.sellers.length === 0 ? (
                        <p className="text-gray-500 mt-4">No hay vendedores disponibles para este libro</p>
                    ) : book.sellers.every(seller => isOwnBook(seller.id)) ? (
                        <div className="mt-4 p-4 bg-coral-50 border-2 border-coral-200 rounded-lg">
                            <p className="text-gray-700">Actualmente solo tú tienes este libro en venta.</p>
                            <Link to="/my-sales" className="mt-2 inline-block text-coral-600 hover:text-coral-700">
                                Ver en mis ventas →
                            </Link>
                        </div>
                    ) : (
                        <ul className="space-y-4 mt-4">
                            {book.sellers.filter(seller => !isOwnBook(seller.id)).map((seller) => (
                            <li 
                                key={seller.id} 
                                className={`flex items-center justify-between p-4 rounded-lg ${
                                    isOwnBook(seller.id) 
                                        ? 'bg-coral-50 border-2 border-coral-200' 
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">
                                            {isOwnBook(seller.id) ? 'Tu oferta' : seller.nombre}
                                        </span>
                                        <span className="text-sm text-gray-500">Estado: {seller.estado}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <span className="text-sm font-medium">{seller.valoracion}</span>
                                    </div>
                                    {isOwnBook(seller.id) ? (
                                        <Link
                                            to="/my-sales"
                                            className="py-2 px-4 bg-coral-100 text-coral-700 rounded-lg font-medium hover:bg-coral-200 transition-colors"
                                        >
                                            Ver mi oferta
                                        </Link>
                                    ) : (
                                        <button 
                                            className="py-2 px-4 bg-coral-500 text-white rounded-lg font-medium hover:bg-coral-600 transition-colors"
                                            onClick={() => console.log('Agregar al carrito')}
                                        >
                                            {seller.precio}€
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>            
        </div>

    );
};

export default BookSellers;