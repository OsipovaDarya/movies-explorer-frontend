import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import search from '../../../images/icon__COLOR_invisible.svg'
import Validation from '../../../utils/Validation';
import SearchShortFilms from '../../SearchShortFilms/SearchShortFilms';




function SearchForm({ showError, handleSubmitSearch, handleChangeSwitchFilm }) {
    const { pathname } = useLocation();
    const {
        formsValue, setFormsValue, handleChange, isValid, setIsValid, } = Validation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        isValid ? handleSubmitSearch(formsValue['find-input']) : showError("Ничего не найдено");
    }

    useEffect(() => {
        if (pathname === '/movies') {
            const storageKeyWord = localStorage.getItem('storageKeyWord');
            storageKeyWord && setFormsValue({ 'find-input': storageKeyWord });
            setIsValid(true);
        } else {
            setFormsValue({ 'find-input': '' });
        }
    }, [pathname]);



    return (
        <section className="search-form">
            <form className="search-form__form"
                onSubmit={handleSubmit}>

                <input className="search-form__input"
                    value={formsValue['find-input'] || ''}
                    type="text"
                    required
                    name='find-input'
                    minLength="1"
                    placeholder='Фильм'
                    onChange={handleChange}>

                </input>
                <button className="search-form__submit"><img className='search-form__img' src={search} alt='картинка лупа' /></button>
                <span className="search-form-error"></span>
            </form>
            <SearchShortFilms handleShortFilms={handleChangeSwitchFilm} />

            {/* <div className='search-form__placeholder'>
                <p className='search-form__text'>Короткометражки</p>
                <img src={plecholder} alt='картинка плейсхолдера' />
            </div> */}
        </section>
    )
}

export default SearchForm;