function Footer() {
    return (
        <footer className="footer">
            <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
            <div className="footer__container">
                <p className="footer__year">&copy; {new Date().getFullYear()}</p>
                <div className="footer__links">
                    <a className="footer__link " target="_blank" rel="noreferrer" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
                    <a className="footer__link" target="_blank" rel="noreferrer" href="https://github.com/OsipovaDarya">Github</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;