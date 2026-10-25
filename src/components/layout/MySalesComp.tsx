import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Book, Genre } from "../../types";
import BookToSell from "../ui/BookToSell";
import LoadingSpinner from "../ui/LoadingSpinner";

const estadoMap: Record<number, string> = {
  5: 'Nuevo con etiqueta',
  4: 'Como nuevo',
  3: 'Buen estado',
  2: 'En condiciones aceptables',
  1: 'Deteriorado',
};

interface BooksCompProps {
  initialGenreId?: number;
}

const MySalesComp: React.FC<BooksCompProps> = ({ initialGenreId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [userBooksLoading, setUserBooksLoading] = useState(false);

  // Form state for new sale
  const [form, setForm] = useState({
    isbn: '',
    precio: '',
    estado: '',
    enVenta: true,
  });

  // Estados para los filtros
  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialGenreId ? [initialGenreId] : []);
  const [, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'titulo-asc' | 'titulo-desc' | 'precio-asc' | 'precio-desc'>('titulo-asc');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [booksData, genresData] = await Promise.all([
          api.getUserSales(),
          api.getGenres()
        ]);
        setBooks(booksData);
        setFilteredBooks(booksData);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Efecto para aplicar los filtros
  useEffect(() => {
    let result = [...books];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.titulo.toLowerCase().includes(term) ||
        book.autor.toLowerCase().includes(term)
      );
    }

    // Filtrar por géneros seleccionados
    if (selectedGenres.length > 0) {
      result = result.filter(book =>
        Array.isArray(book.libro?.generoLiterario) &&
        book.libro.generoLiterario.some(genre => genre.id && selectedGenres.includes(genre.id))
      );
    }

    // Ordenar libros
    result.sort((a, b) => {
      switch (sortBy) {
        case 'titulo-asc':
          return a.titulo.localeCompare(b.titulo);
        case 'titulo-desc':
          return b.titulo.localeCompare(a.titulo);
        case 'precio-asc':
          return (a.precio || 0) - (b.precio || 0);
        case 'precio-desc':
          return (b.precio || 0) - (a.precio || 0);
        default:
          return 0;
      }
    });

    setFilteredBooks(result);
  }, [books, searchTerm, selectedGenres, sortBy]);

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.isbn === updatedBook.isbn ? { ...book, ...updatedBook } : book
      )
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    setSortBy('titulo-asc');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);

    try {
      const idUsuario = Number(localStorage.getItem('usuario'));
      const response = await api.createSale({
        usuarioId: idUsuario,
        libroISBN: Number(form.isbn),
        precio: Number(form.precio),
        estado: Number(form.estado),
        enVenta: true
      });
      
      if (response) {
        // Reload books list
        const booksData = await api.getUserSales();
        setBooks(booksData);
        setShowAddModal(false);
        setForm({ isbn: '', precio: '', estado: '', enVenta: true });
      }
    } catch (err) {
      console.error('Error creating sale:', err);
      setAddError('Error al crear la venta. Por favor, inténtalo de nuevo.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch user's books that are not already for sale
  useEffect(() => {
    const fetchUserBooks = async () => {
      setUserBooksLoading(true);
      try {
        const userData = await api.getUserWithBooks();
        // Filter out books that are already for sale
        const availableBooks = (userData.libros || []).filter((libro: Book) => !libro.enVenta);
        setUserBooks(availableBooks);
      } catch (error) {
        console.error('Error fetching user books:', error);
        setAddError('Error al cargar tus libros');
      } finally {
        setUserBooksLoading(false);
      }
    };

    if (showAddModal) {
      fetchUserBooks();
    }
  }, [showAddModal]);

  return (
    <main className="min-h-[calc(100vh-96px-96px)] px-6 py-12 flex justify-center relative bg-white">
      {/* Fondo decorativo */}
      <div className="absolute top-28 left-20 w-96 h-96 bg-coral-500/30 rounded-xl -z-10"></div>

      <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg p-8 flex gap-10">

        <section className="flex-1">
          {/* Barra opciones */}
          <div className="flex justify-between items-center text-sm text-gray-800 mb-8">
            <div className="flex items-center gap-4">
              <div>
                Ordenar por:{" "}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                >
                  <option value="titulo-asc">Título, A-Z</option>
                  <option value="titulo-desc">Título, Z-A</option>
                  <option value="precio-asc">Precio, menor a mayor</option>
                  <option value="precio-desc">Precio, mayor a menor</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                Añadir venta
              </button>
            </div>
            <div>Mostrando {filteredBooks.length} resultados</div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando libros...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 text-coral-500 hover:text-coral-600"
              >
                Reintentar
              </button>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron libros con los filtros seleccionados</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-coral-500 hover:text-coral-600"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book: Book) => (
                <BookToSell key={book.isbn} libro={book} onUpdate={handleUpdateBook} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal para añadir venta */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-coral-500 text-xl"
              onClick={() => {
                setShowAddModal(false);
                setAddError(null);
                setForm({ isbn: '', precio: '', estado: '', enVenta: true });
              }}
              aria-label="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">Añadir libro para venta</h2>

            {addError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {addError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selecciona el libro
                </label>
                {userBooksLoading ? (
                  <div className="flex items-center justify-center py-2">
                    <LoadingSpinner className="h-5 w-5" />
                    <span className="ml-2 text-sm text-gray-500">Cargando libros...</span>
                  </div>
                ) : userBooks.length === 0 ? (
                  <p className="text-sm text-gray-500 py-2">No tienes libros disponibles para vender</p>
                ) : (
                  <select
                    name="isbn"
                    required
                    value={form.isbn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value="">Selecciona un libro</option>
                    {userBooks.map((book) => (
                      <option key={book.isbn} value={book.isbn}>
                        {book.titulo} - ISBN: {book.isbn}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio (€)
                </label>
                <input
                  type="number"
                  name="precio"
                  required
                  value={form.precio}
                  onChange={handleChange}
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
                  value={form.estado}
                  onChange={handleChange}
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

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={addLoading}
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addLoading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner className="h-5 w-5" />
                      <span className="ml-2">Creando venta...</span>
                    </div>
                  ) : (
                    'Crear venta'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default MySalesComp;
