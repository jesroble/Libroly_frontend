import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Book, Genre } from "../../types";
import BookCard from "../ui/BookCard";
import LoadingSpinner from "../ui/LoadingSpinner";

interface BooksCompProps {
  initialGenreId?: number;
}

const BooksComp: React.FC<BooksCompProps> = ({ initialGenreId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialGenreId ? [initialGenreId] : []);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'titulo-asc' | 'titulo-desc' | 'precio-asc' | 'precio-desc'>('titulo-asc');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [booksData, genresData] = await Promise.all([
          api.getAllBooks(),
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

  useEffect(() => {
    let result = [...books];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.titulo.toLowerCase().includes(term) ||
        book.autor.toLowerCase().includes(term)
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter(book => 
        book.generoLiterario.some(genre => selectedGenres.includes(genre.id!))
      );
    }

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
  }, [books, selectedGenres, priceRange, searchTerm, sortBy]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    setSortBy('titulo-asc');
  };

  return (
    <main className="min-h-[calc(100vh-96px-96px)] px-6 py-12 flex justify-center relative bg-white">
      <div className="absolute top-28 left-20 w-96 h-96 bg-coral-500/30 rounded-xl -z-10"></div>

      <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg p-8 flex gap-10">
        <aside className="w-60 text-sm font-semibold text-gray-800">
          <div className="mb-6">
            <label className="block mb-1 text-xs font-bold">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por título o autor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-base mb-2">Géneros</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {genres.map((genre) => (
                <label key={genre.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id!)}
                    onChange={() => handleGenreToggle(genre.id!)}
                    className="rounded text-coral-500 focus:ring-coral-500"
                  />
                  <span className="text-sm">{genre.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full text-coral-500 hover:text-coral-600 text-sm font-medium"
          >
            Limpiar filtros
          </button>
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-center text-sm text-gray-800 mb-8 mt-5">
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
            <div>Mostrando {filteredBooks.length} resultados</div>
          </div>

          {loading ? (
            <div className="text-center py-12">
                <LoadingSpinner />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBooks.map((book: Book) => (
                <BookCard key={book.isbn} libro={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BooksComp;
