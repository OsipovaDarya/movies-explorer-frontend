import { useState, useEffect, useContext } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from '../ErrorResult/Context/CurrentUserContext';
import { renderMovies } from "../../utils/renderFilms";
import { apiMovies } from '../../utils/MoviesApi';



function Movies() {
    const [keyCondition, setKeyCondition] = useState('');
    const [isStateShortFilms, setIsStateShortFilms] = useState(false);
    const [renderDownload, setrenderDownload] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { savedMovies } = useContext(CurrentUserContext);


    const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];

    useEffect(() => {
        const storageSearchResult = JSON.parse(localStorage.getItem('storageSearchResult')) || [];
        const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
        const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort')) || false;

        storageSearchResult && setSearchedMovies(storageSearchResult);
        storageKeyWord && setKeyCondition(storageKeyWord);
        storageIsShort && setIsStateShortFilms(storageIsShort);
    }, []);

    const getFilteredMovies = (keyWord, isShortMovies) => {

        function setupFilteredFilms(movies) {
            setSearchedMovies(movies);
            localStorage.setItem('storageSearchResult', JSON.stringify(movies));
            movies.length === 0
                ? setErrorMessage('Ничего не найдено')
                : setErrorMessage('');
        };

        if (storageAllMovies.length === 0) {
            setrenderDownload(true);
            apiMovies.getMovies()
                .then((allMovies) => {
                    localStorage.setItem('storageAllMovies', JSON.stringify(allMovies));
                    console.log('afsafasfasf', allMovies)
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

    const handleSubmitForSearch = (keyWord) => {
        setKeyCondition(keyWord);
        localStorage.setItem('storageKeyWord', keyWord);
        getFilteredMovies(keyWord, isStateShortFilms);
    };

    const handleChangeSwitchFilm = (isChecked) => {
        setIsStateShortFilms(isChecked);
        localStorage.setItem('storageIsShort', isChecked);
        getFilteredMovies(keyCondition, isChecked);
    };


    return (
        <main className="movies">
            <SearchForm
                handleSubmitSearch={handleSubmitForSearch}
                handleChangeSwitchFilm={handleChangeSwitchFilm}
                showError={setErrorMessage} />
            {renderDownload ? <Preloader /> : ''}
            {errorMessage.length !== 0 ? <p className='cards__search-message'>{errorMessage}</p> : <MoviesCardList movies={searchedMovies} />}
        </main>
    )
}

export default Movies;