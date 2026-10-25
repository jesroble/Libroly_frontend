import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookDetails from "../components/layout/BookDetails";
import BookRecommendations from "../components/layout/BookRecommendations";
import { api } from "../services/api";
import type { Book } from "../types";

const BookName: React.FC = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (!isbn) {
                navigate('/404');
                return;
            }

            try {
                const bookData = await api.getBookByIsbn(isbn);
                setBook(bookData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Error al cargar los detalles del libro');
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [isbn, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">{error || 'No se encontró el libro'}</p>
                <button
                    onClick={() => navigate('/books')}
                    className="text-coral-500 hover:text-coral-600"
                >
                    Volver al catálogo
                </button>
            </div>
        );
    }

    return (
        <div>
            <BookDetails book={book} />
            <BookRecommendations currentBook={book} />
        </div>
    );
};

export default BookName;