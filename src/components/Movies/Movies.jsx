import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import movies from "../../utils/films"
import Preloader from "../Preloader/Preloader";
import { useState } from "react";


function Movies() {
    const [loading, setLoading] = useState(false);

    function getMovies() {
        setLoading(true)
    };

    return (
        <main className="movies">
            <SearchForm />

            <MoviesCardList movies={movies} />
        </main>
    )
}

export default Movies;