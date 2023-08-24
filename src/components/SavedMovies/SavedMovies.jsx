import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import movies from "../../utils/films"




function SavedMovies({ loggedIn }) {
    return (
        <main className="saved-movies">
            <SearchForm></SearchForm>
            <MoviesCardList movies={movies} loggedIn={loggedIn} />
        </main>
    )
}
export default SavedMovies;