import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import { renderMovies } from "../../utils/renderFilms";
import { CurrentUserContext } from "../ErrorResult/Context/CurrentUserContext";
import { useEffect, useState, useContext } from "react";


function SavedMovies() {
    const [isStateShortFilms, setIsStateShortFilms] = useState(false);
    const [keyCondition, setKeyCondition] = useState('');
    const { savedMovies } = useContext(CurrentUserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);

    const getFilterMovies = (keyWord, isShort) => {
        const filterMovies = renderMovies(savedMovies, keyWord, isShort);
        filterMovies.length === 0 ? setErrorMessage("Ничего не сохранили") : setErrorMessage('');

        setMovies(filterMovies);
    };

    useEffect(() => {
        setMovies(savedMovies);
        getFilterMovies(keyCondition, isStateShortFilms);

    }, [savedMovies]);

    const handleSubmitSearch = (keyWord) => {
        setKeyCondition(keyWord);
        getFilterMovies(keyWord, isStateShortFilms);
    };

    const handleChangeSwitchFilm = (isChecked, keyValue) => {
        setIsStateShortFilms(isChecked);
        getFilterMovies(keyValue, isChecked);
    };



    return (
        <main className="saved-movies">
            <SearchForm
                handleSubmitSearch={handleSubmitSearch}
                handleChangeSwitchFilm={handleChangeSwitchFilm}>
            </SearchForm>
            {errorMessage.length !== 0 ? <p className='cards__search-message'>{errorMessage}</p> : <MoviesCardList movies={movies} isDeletePage={true} />}
        </main>
    )
}
export default SavedMovies;