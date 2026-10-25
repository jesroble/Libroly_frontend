import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import UserBookCard from "../ui/UserBooks";
import LoadingSpinner from "../ui/LoadingSpinner";
import type { Genre } from "../../types";

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
  precio?: number;
  generoLiterario: { id: number; nombre: string }[];
}

const MyBooksComponent: React.FC = () => {
  const [books, setBooks] = useState<UserBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<UserBook[]>([]);
  const [, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'titulo-asc' | 'titulo-desc' | 'fecha-asc' | 'fecha-desc' | 'valoracion-desc'>('titulo-asc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Estados para agregar libro
  const [showAddModal, setShowAddModal] = useState(false);
  const [isbnInput, setIsbnInput] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const userData = await api.getUserWithBooks();
        setBooks(userData.libros || []);
        setFilteredBooks(userData.libros || []);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar tus libros');
        setLoading(false);
      }
    };
    const fetchGenres = async () => {
      try {
        const genresData = await api.getGenres();
        setGenres(genresData);
      } catch {}
    };
    fetchUserBooks();
    fetchGenres();
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
        book.generoLiterario && book.generoLiterario.some(genre => selectedGenres.includes(genre.id))
      );
    }

    // Filtrar por rango de precio
    if (priceRange.min) {
      result = result.filter(book => (book.precio ?? 0) >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(book => (book.precio ?? 0) <= Number(priceRange.max));
    }

    // Aplicar ordenamiento
    result.sort((a, b) => {
      switch (sortBy) {
        case 'titulo-asc':
          return a.titulo.localeCompare(b.titulo);
        case 'titulo-desc':
          return b.titulo.localeCompare(a.titulo);
        case 'fecha-asc':
          return new Date(a.fechaPublicacion).getTime() - new Date(b.fechaPublicacion).getTime();
        case 'fecha-desc':
          return new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime();
        case 'valoracion-desc':
          return b.valoracion - a.valoracion;
        default:
          return 0;
      }
    });

    setFilteredBooks(result);
  }, [books, searchTerm, selectedGenres, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('titulo-asc');
    setSelectedGenres([]);
    setPriceRange({ min: '', max: '' });
  };

  return (
    <main className="min-h-[calc(100vh-96px-96px)] px-6 py-12 flex justify-center relative bg-white">
      <div className="absolute top-28 left-20 w-96 h-96 bg-coral-500/30 rounded-xl -z-10"></div>

      <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex gap-10">
          <section className="flex-1">
            <div className="flex justify-between items-center text-sm text-gray-800 mb-8 mt-5">
              <div className="flex items-center gap-4">
                <span>Ordenar por: </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                >
                  <option value="titulo-asc">Título, A-Z</option>
                  <option value="titulo-desc">Título, Z-A</option>
                  <option value="fecha-desc">Más recientes</option>
                  <option value="fecha-asc">Más antiguos</option>
                  <option value="valoracion-desc">Mejor valorados</option>
                </select>
                <button
                  className="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 transition-colors flex items-center gap-2"
                  onClick={() => setShowAddModal(true)}
                  title="Agregar libro por ISBN"
                >
                  <i className="fas fa-plus"></i>
                  <span className="hidden sm:inline">Agregar libro</span>
                </button>
              </div>
              <div>
                Mostrando {filteredBooks.length} resultados
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-coral-500 hover:text-coral-600"
                >
                  Reintentar
                </button>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                {books.length === 0 ? (
                  <div>
                    <p className="text-gray-500 mb-4">No tienes libros en tu biblioteca aún</p>
                    <p className="text-sm text-gray-400">¡Comienza a agregar libros para verlos aquí!</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500">No se encontraron libros con los filtros seleccionados</p>
                    <button 
                      onClick={clearFilters}
                      className="mt-4 text-coral-500 hover:text-coral-600"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredBooks.map((book: UserBook) => (
                  <UserBookCard key={book.isbn} libro={book} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Modal para agregar libro */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-coral-500 text-xl"
                onClick={() => { setShowAddModal(false); setIsbnInput(""); setAddError(null); }}
                aria-label="Cerrar"
              >
                <i className="fas fa-times"></i>
              </button>
              <h2 className="text-lg font-bold mb-4 text-coral-600">Agregar libro por ISBN</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAddLoading(true);
                  setAddError(null);
                  try {
                    // Obtener idUsuario del localStorage
                    const idUsuario = Number(localStorage.getItem('usuario'));
                    const res = await api.addBookByIsbn({
                      idUsuario,
                      isbn: Number(isbnInput)
                    });
                    if (res) {
                      setShowAddModal(false);
                      setIsbnInput("");
                      setAddError(null);
                      // Refresca la lista
                      const userData = await api.getUserWithBooks();
                      setBooks(userData.libros || []);
                      setFilteredBooks(userData.libros || []);
                    } else {
                      setAddError("No se encontró el libro o ya está en tu biblioteca.");
                    }
                  } catch (err) {
                    setAddError("No se pudo agregar el libro. Verifica el ISBN.");
                  } finally {
                    setAddLoading(false);
                  }
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Introduce el ISBN"
                  value={isbnInput}
                  onChange={e => setIsbnInput(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-coral-500"
                  required
                />
                {addError && <p className="text-red-500 text-xs">{addError}</p>}
                <button
                  type="submit"
                  className="bg-coral-500 hover:bg-coral-600 text-white rounded-md py-2 font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  disabled={addLoading}
                >
                  {addLoading ? <LoadingSpinner className="h-5 w-5" /> : <i className="fas fa-plus"></i>}
                  Agregar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBooksComponent;