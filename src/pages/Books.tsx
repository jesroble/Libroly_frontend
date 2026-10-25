import React from "react";
import { useSearchParams } from "react-router-dom";
import BooksComp from "../components/layout/BooksComp";

const Books: React.FC = () => {
    const [searchParams] = useSearchParams();
    const genreId = searchParams.get('genre');

    return (
        <div>
            <BooksComp initialGenreId={genreId ? parseInt(genreId) : undefined} />
        </div>
    );
};

export default Books;