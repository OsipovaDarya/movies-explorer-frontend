import strelki from '../../../images/strelki.png'

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__title">Портфолио</div>
            <ul className="portfolio__links">
                <li className="portfolio__link">
                    <a className="portfolio__text" href="https://github.com/OsipovaDarya/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт<img className="portfolio__img" src={strelki} alt="стрелка" /></a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__text" href="https://github.com/OsipovaDarya/russian-travel">Адаптивный сайт<img className="portfolio__img" src={strelki} alt="стрелка" /></a>
                </li>
                <li className="portfolio__link" >
                    <a className="portfolio__text" href="https://github.com/OsipovaDarya/mesto" target="_blank" rel="noreferrer">Одностраничное приложение<img className="portfolio__img" src={strelki} alt="стрелка" /></a>
                </li>
            </ul>

        </section>
    )

}

export default Portfolio;