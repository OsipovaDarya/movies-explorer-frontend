import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


function SearchShortFilms({ handleShortFilms }) {
    const { pathname } = useLocation();
    const [isCheckFilm, setIsisCheckFilm] = useState(false);

    function handleFilmSwitch() {
        setIsisCheckFilm(!isCheckFilm);
        handleShortFilms(!isCheckFilm);
    }

    useEffect(() => {
        if (pathname === '/movies') {
            const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort'));
            storageIsShort && setIsisCheckFilm(storageIsShort);
        } else {
            setIsisCheckFilm(false);
        }
    }, []);

    return (
        <label className='search-short-films__container'>
            <input
                className='search-short-films__input'
                type='checkbox'
                checked={isCheckFilm}
                onChange={handleFilmSwitch}
            />
            <span className='search-short-films__switch' />
            <span className='search-short-films__text'>Короткометражки</span>
        </label>
    )
}
export default SearchShortFilms;