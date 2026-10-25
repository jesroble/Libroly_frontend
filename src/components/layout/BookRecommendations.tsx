import React from 'react';
import NewReleasesSection from '../sections/NewReleasesSection';
import type { Book } from '../../types';

interface BookRecommendationsProps {
    currentBook: Book;
}

const BookRecommendations: React.FC<BookRecommendationsProps> = () => {
    return (
        <div className="py-12 bg-gray-50">
            <NewReleasesSection />
        </div>
    );
};

export default BookRecommendations;