import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import movies from "../../utils/films"




function SavedMovies({ loggedIn }) {
    return (
        <div className="saved-movies">
            <SearchForm></SearchForm>
            <MoviesCardList movies={movies} loggedIn={loggedIn} />
        </div>
    )
}
export default SavedMovies;