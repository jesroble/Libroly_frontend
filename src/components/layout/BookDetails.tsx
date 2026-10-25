import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import type { Book } from '../../types';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const { addItem, removeItem, state } = useCart();
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [vendedores, setVendedores] = useState<any[]>([]);
  const [estadoFiltro, setEstadoFiltro] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [addToLibraryLoading, setAddToLibraryLoading] = useState(false);
  const [addToLibrarySuccess, setAddToLibrarySuccess] = useState(false);
  const [addToLibraryError, setAddToLibraryError] = useState<string | null>(null);
  const [userBooks, setUserBooks] = useState<number[] | null>(null);

  // Get current user ID for filtering own sales
  const currentUserId = user?.id;

  const vendedoresFiltrados = estadoFiltro == ''
    ? vendedores
    : vendedores.filter(v => v.estado == estadoFiltro);

  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getVentaByIsbn(book.isbn.toString());
        setVendedores(data);
      } catch (error: any) {
        console.error('Error al obtener vendedores:', error);
        const isConnectionError = error.response?.status === 500 && 
          (error.response?.data?.message?.includes('JPA EntityManager') || 
           error.response?.data?.message?.includes('Communications link failure'));
        
        if (isConnectionError && retryCount < 3) {
          // Reintento automático después de 2 segundos
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
          setError('Problemas de conexión. Reintentando...');
        } else {
          setError('No se pudieron cargar los vendedores. Por favor, intenta recargar la página.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendedores();
  }, [book.isbn, retryCount]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      const idUsuario = Number(localStorage.getItem('usuario'));
      if (!idUsuario) return;
      try {
        const userData = await api.getUserWithBooks();
        const libros = userData.libros ?? [];
        setUserBooks(libros.map((l: any) => l.isbn));
      } catch {
        setUserBooks([]);
      }
    };
    fetchUserBooks();
  }, [book.isbn]);

  const handleAddToCart = (vendedor: any) => {
    addItem({
      id: `${book.isbn}-${vendedor.id}`, // ID único por vendedor
      isbn: book.isbn,
      title: book.titulo,
      price: vendedor.precio,
      image: book.urlImgPortada,
      author: book.autor,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddToLibrary = async () => {
    setAddToLibraryLoading(true);
    setAddToLibraryError(null);
    try {
      const idUsuario = Number(localStorage.getItem('usuario'));
      const res = await api.addBookByIsbn({
        idUsuario: Number(idUsuario),
        isbn: Number(book.isbn)
      });
      if (res) {
        setAddToLibrarySuccess(true);
        setTimeout(() => setAddToLibrarySuccess(false), 2500);
      } else {
        setAddToLibraryError('No se pudo agregar el libro o ya está en tu biblioteca.');
      }
    } catch (err) {
      setAddToLibraryError('No se pudo agregar el libro. Intenta de nuevo.');
    } finally {
      setAddToLibraryLoading(false);
    }
  };

  const estadoMap: Record<number, string> = {
    5: 'Nuevo con etiqueta',
    4: 'Como nuevo',
    3: 'Buen estado',
    2: 'En condiciones aceptables',
    1: 'Deteriorado',
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={book.urlImgPortada || '/placeholder-book.jpg'}
            alt={book.titulo}
            className="max-w-md w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {book.titulo}
            </h1>
            <p className="text-xl text-gray-600 mb-1">Por {book.autor}</p>
            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
          </div>

          {book.descripcion && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{book.descripcion}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {book.paginas && (
              <div>
                <span className="font-semibold">Páginas:</span> {book.paginas}
              </div>
            )}
            {book.publisher && (
              <div>
                <span className="font-semibold">Editorial:</span> {book.publisher}
              </div>
            )}
            {book.fechaPublicacion && (
              <div>
                <span className="font-semibold">Fecha:</span>{' '}
                {new Date(book.fechaPublicacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
            {book.idiomas && book.idiomas.length > 0 && (
                <div>
                  <span className="font-semibold">Idiomas:</span>{' '}
                  {book.idiomas.map(lang => lang.nombre).join(', ')}
                </div>
              )}
            {Boolean(book.valoracion) && (
              <div>
                <span className="font-semibold">Valoración:</span> {book.valoracion}/5 ⭐
              </div>
            )}
            {book.generoLiterario && book.generoLiterario.length > 0 && (
              <div className="col-span-2">
                <span className="font-semibold">Géneros:</span>{' '}
                {book.generoLiterario.map((genre) => typeof genre === 'string' ? genre : genre.nombre).join(', ')}
              </div>
            )}
          </div>

          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              ¡Libro agregado al carrito!
            </div>
          )}

          {/* Sección: ¿Ya tienes este libro? */}
          {userBooks && !userBooks.includes(book.isbn) && (
            <div className="my-3 p-2 bg-gray-50 border border-coral-100 rounded-lg flex flex-col items-center max-w-xs mx-auto">
              <span className="font-semibold text-gray-700 mb-1 text-sm">¿Ya tienes este libro?</span>
              <button
                onClick={handleAddToLibrary}
                disabled={addToLibraryLoading}
                className="flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white px-3 py-1.5 rounded font-semibold text-sm transition-colors disabled:opacity-60"
              >
                <i className="fas fa-plus"></i>
                {addToLibraryLoading ? 'Agregando...' : 'Agregar a mi biblioteca'}
              </button>
              {addToLibrarySuccess && (
                <span className="mt-1 text-green-600 text-xs">¡Libro agregado a tu biblioteca!</span>
              )}
              {addToLibraryError && (
                <span className="mt-1 text-red-500 text-xs">{addToLibraryError}</span>
              )}
            </div>
          )}

          {/* Vendedores */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vendedores disponibles

            {/* Filtro */}
            <div className='mb-2 ml-1'>
              <select 
                className='border rounded px-2 py-1 text-sm'
                value={estadoFiltro}
                onChange={e => setEstadoFiltro(e.target.value == '' ? '' : Number(e.target.value))}
              >
                <option value="">Filtrar por estado</option>
                <option value={5}>Nuevo con etiqueta</option>
                <option value={4}>Como nuevo</option>
                <option value={3}>Buen estado</option>
                <option value={2}>En condiciones aceptables</option>
                <option value={1}>Deteriorado</option>
              </select>
            </div>

            </h3>
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
                <span className="ml-3 text-gray-600">{error || 'Cargando vendedores...'}</span>
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  onClick={() => {
                    setRetryCount(0);
                    setError(null);
                  }}
                  className="text-coral-500 hover:text-coral-600 underline"
                >
                  Reintentar
                </button>
              </div>
            ) : vendedoresFiltrados.length === 0 ? (
              <p>No hay vendedores disponibles para este libro.</p>
            ) : currentUserId && vendedores.every(v => v.id === currentUserId) ? (
              <div className="p-4 bg-coral-50 border-2 border-coral-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">Solo tú tienes este libro en venta</p>
                  <p className="text-sm text-gray-600 mt-1">{estadoMap[vendedores[0].estado]}</p>
                </div>
                <div className="text-right">
                  <p className="text-coral-600 font-bold text-lg">€{vendedores[0].precio.toFixed(2)}</p>
                </div>
              </div>
            ) : vendedoresFiltrados.length === 0 ? (
              <p>No hay otros vendedores disponibles para este libro.</p>
            ) : (
              <div className="space-y-3">
                {vendedoresFiltrados.map((v) => {
                  const itemId = `${book.isbn}-${v.id}`;
                  const isInCart = state.items.some((item) => item.id === itemId);
                  return (
                    <div
                      key={v.id}
                      className="border p-3 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">
                          <Link
                          to={`/seller/${v.id}`}
                          className='hover:underline hover:text-coral-600 transition-color'
                          >
                            {v.nombre} {v.apellidos}
                          </Link>
                        </p>
                        <p className="text-sm text-gray-500">{estadoMap[v.estado]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-coral-600 font-bold text-lg">
                          €{v.precio.toFixed(2)}
                        </p>
                        <button
                          onClick={() => isInCart ? removeItem(itemId) : handleAddToCart(v)}
                          className={`mt-2 px-3 py-1 rounded-md text-sm font-medium text-white transition-colors duration-150 ${
                            isInCart
                              ? 'bg-gray-400 hover:bg-gray-500'
                              : 'bg-coral-500 hover:bg-coral-600'
                          }`}
                        >
                          {isInCart ? 'Quitar del carrito' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Si eres vendedor de este libro, mostrar un enlace rápido */}
          {currentUserId && vendedores.some(v => v.id === currentUserId) && (
            <div className="mt-4 p-4 bg-coral-50 border border-coral-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">Tienes este libro en venta</p>
                <p className="text-sm text-gray-600 mt-1">
                  {estadoMap[vendedores.find(v => v.id === currentUserId)?.estado]}
                </p>
              </div>
              <div className="text-right">
                <p className="text-coral-600 font-bold text-lg">
                  €{vendedores.find(v => v.id === currentUserId)?.precio.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
