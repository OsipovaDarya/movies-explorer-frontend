import search from '../../../images/icon__COLOR_invisible.svg'
import plecholder from "../../../images/smalltumb.svg"

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <input className="search-form__input" placeholder='Фильм'></input>
                <button className="search-form__submit"><img className='search-form__img' src={search} alt='картинка лупа' /></button>
            </form>
            <div className='search-form__placeholder'>
                <p className='search-form__text'>Короткометражки</p>
                <img src={plecholder} alt='картинка плейсхолдера' />
            </div>
        </section>
    )
}

export default SearchForm;