import { useState, useEffect, useContext } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from '../ErrorResult/Context/CurrentUserContext';
import { renderMovies } from "../../utils/renderFilms";
import { apiMovies } from '../../utils/MoviesApi';



function Movies() {
    const [keyCondition, setKeyCondition] = useState(() => localStorage.getItem('storageKeyWord') || '');
    const [isStateShortFilms, setIsStateShortFilms] = useState(() => JSON.parse(localStorage.getItem('storageIsShort') || 'false'));
    const [renderDownload, setrenderDownload] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState(() => JSON.parse(localStorage.getItem('storageSearchResult') || '[]'));
    const [errorMessage, setErrorMessage] = useState('');
    const { savedMovies } = useContext(CurrentUserContext);


    const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies') || '[]')


    const getFilteredMovies = (keyWord, isShortMovies) => {

        function setupFilteredFilms(movies) {
            setSearchedMovies(movies);
            console.log("fsdfsdf", localStorage)
            localStorage.setItem('storageSearchResult', JSON.stringify(movies));
            movies.length === 0 && !(storageAllMovies.length === 0)
                ? setErrorMessage('Ничего не найдено')
                : setErrorMessage('')
        };

        if (storageAllMovies.length === 0) {
            setrenderDownload(true);
            apiMovies.getMovies()
                .then((allMovies) => {
                    localStorage.setItem('storageAllMovies', JSON.stringify(allMovies));
                    const filteredMovies = keyWord
                        ? renderMovies(allMovies, keyWord, isShortMovies)
                        : [];
                    setupFilteredFilms(filteredMovies);
                })
                .catch((err) => {
                    setErrorMessage('Ничего не найдено');
                })
                .finally(() => setrenderDownload(false));
        } else {
            const filteredMovies = keyWord
                ? renderMovies(storageAllMovies, keyWord, isShortMovies)
                : [];

            setupFilteredFilms(filteredMovies);
        }
    };

    useEffect(() => {
        getFilteredMovies(keyCondition, isStateShortFilms);
    }, [savedMovies]
    );

    const handleSubmitSearch = (keyWord) => {
        setKeyCondition(keyWord);
        localStorage.setItem('storageKeyWord', keyWord);
        getFilteredMovies(keyWord, isStateShortFilms);
    };

    const handleChangeSwitchFilm = (isChecked, actualSearchInput) => {
        setIsStateShortFilms(isChecked);
        localStorage.setItem('storageIsShort', isChecked);
        getFilteredMovies(actualSearchInput, isChecked);
    };


    return (
        <main className="movies">
            <SearchForm
                handleSubmitSearch={handleSubmitSearch}
                handleChangeSwitchFilm={handleChangeSwitchFilm}
                showError={setErrorMessage} />
            {renderDownload ? <Preloader /> : ''}
            {errorMessage.length !== 0 ? <p className='cards__search-message'>{errorMessage}</p> : <MoviesCardList movies={searchedMovies} />}
        </main>
    )
}

export default Movies;