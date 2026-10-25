import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../../types';
import { api } from '../../services/api';

interface BookCardProps {
  libro: Book;
  onUpdate?: (updatedBook: Book) => void;
}

const estadoMap: Record<number, string> = {
  5: 'Nuevo con etiqueta',
  4: 'Como nuevo',
  3: 'Buen estado',
  2: 'En condiciones aceptables',
  1: 'Deteriorado',
};

const BookCard: React.FC<BookCardProps> = ({ libro, onUpdate }) => {
  const { titulo, autor, urlImgPortada, valoracion = 5 } = libro;
  const [imageError, setImageError] = useState(false);
  const [userPrecio, setUserPrecio] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editForm, setEditForm] = useState<{ precio: number | string | undefined; estado: number | string | undefined }>({
    precio: libro.precio,
    estado: libro.estado,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const ventas = await api.getVentaByIsbn(libro.isbn.toString());
        const idUsuario = localStorage.getItem('usuario');
        if (ventas && ventas.length > 0) {
          const ventaUsuario = ventas.find((venta: any) => String(venta.id) === String(idUsuario));
          if (ventaUsuario)
            setUserPrecio(ventaUsuario.precio);
          else
            setUserPrecio(null);
        }
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    fetchVentas();
  }, [libro.isbn]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      await api.createSale({
        usuarioId: Number(localStorage.getItem('usuario')),
        libroISBN: Number(libro.isbn),
        precio: Number(editForm.precio),
        estado: Number(editForm.estado),
        enVenta: true,
      });
      setShowEditModal(false);
      setUserPrecio(Number(editForm.precio));
      if (onUpdate) {
        onUpdate({
          ...libro,
          precio: Number(editForm.precio),
          estado: Number(editForm.estado),
        });
      }
    } catch (err) {
      setEditError('Error al actualizar la venta');
    } finally {
      setEditLoading(false);
    }
  };

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
              <button
                type="button"
                className="bg-coral-500 text-white px-4 py-2 rounded-md hover:bg-coral-600 transition-colors text-sm"
                onClick={() => setShowEditModal(true)}
              >
                Editar
              </button>
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
            <span className="text-coral-500 font-semibold text-m">
              {userPrecio != null ? `€${userPrecio}` : "vendido"}
            </span>
          </div>
          <p className="text-gray-600 text-xs mb-2">{estadoMap[editForm.estado as number]}</p>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-coral-500 text-xl"
              onClick={() => setShowEditModal(false)}
              aria-label="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Editar venta</h2>
            <form
              onSubmit={handleEditSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio (€)
                </label>
                <input
                  type="number"
                  name="precio"
                  required
                  value={editForm.precio}
                  onChange={e => setEditForm(f => ({ ...f, precio: e.target.value }))}
                  placeholder="Ingresa el precio"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado del libro
                </label>
                <select
                  name="estado"
                  required
                  value={editForm.estado}
                  onChange={e => setEditForm(f => ({ ...f, estado: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Selecciona el estado</option>
                  {Object.entries(estadoMap).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              {editError && (
                <div className="mb-2 text-red-500 text-sm">{editError}</div>
              )}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;