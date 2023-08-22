import search from '../../../images/icon__COLOR_invisible.png'

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <input className="search-form__input" placeholder='Фильм'></input>
                <button className="search-form__submit"><img className='search-form__img' src={search} alt='картинка лупа' /></button>
            </form>
        </section>
    )
}

export default SearchForm;