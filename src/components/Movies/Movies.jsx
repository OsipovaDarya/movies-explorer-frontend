import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from '../ErrorResult/Context/CurrentUserContext';
import { renderMovies } from "../../utils/renderFilms";
import { apiMovies } from '../../utils/MoviesApi';



function Movies({ renderLoading }) {
    const [keyCondition, setKeyCondition] = useState('');
    const [isStateShortFilms, setIsStateShortFilms] = useState(() => JSON.parse(localStorage.getItem('storageIsShort')) || false);
    const [renderDownload, setRenderDownload] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState(() => JSON.parse(localStorage.getItem('storageSearchResult')) || []);
    const storageAllMovies = useMemo(() => JSON.parse(localStorage.getItem('storageAllMovies')) || [], []);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const storageKeyWord = localStorage.getItem('storageKeyWord') || '';

        storageKeyWord && setKeyCondition((_) => storageKeyWord);

    }, [keyCondition]);

    const getFilteredMovies = (keyWord, isShortMovies) => {

        function setupFilteredFilms(movies) {
            setSearchedMovies([...movies]);
            localStorage.setItem('storageSearchResult', JSON.stringify(movies));
            movies.length === 0 && !(storageAllMovies.length === 0)
                ? setErrorMessage('Ничего не найдено')
                : setErrorMessage('')
        };


        if (storageAllMovies.length === 0) {
            setRenderDownload(true);
            apiMovies.getMovies()
                .then((allMovies) => {
                    localStorage.setItem('storageAllMovies', JSON.stringify(allMovies));
                    const filteredMovies = keyWord
                        ? renderMovies(allMovies, keyWord, isShortMovies)
                        : [];
                    setupFilteredFilms([...filteredMovies]);
                })
                .catch((err) => {
                    setErrorMessage('Ничего не найдено');
                })
                .finally(() => setRenderDownload(false));
        } else {

            const filteredMovies = keyWord
                ? renderMovies(storageAllMovies, keyWord, isShortMovies)
                : [];

            setupFilteredFilms([...filteredMovies]);
        }
    }

    useEffect(() => {
        getFilteredMovies(keyCondition, isStateShortFilms);
    }, [keyCondition]
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

    if (renderLoading) {
        return <></>
    }


    return (
        <main className="movies">
            <SearchForm
                handleSubmitSearch={handleSubmitSearch}
                handleChangeSwitchFilm={handleChangeSwitchFilm}
                showError={setErrorMessage} />
            {renderLoading ? <Preloader /> : ''}
            {errorMessage.length !== 0 ? <p className='cards__search-message'>{errorMessage}</p> : <MoviesCardList movies={searchedMovies} />}
        </main>
    )
}

export default Movies;