import logo from "../../../images/text__COLOR_landing-logo.svg"

function Promo(props) {


    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__container-text">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>

                </div>
                <img className="promo__logo" src={logo} alt="логотип планета с буквами" />
            </div>
            <div className="promo__img"></div>
            <button className="promo__button" type="button"><a className="promo__link" href="https://practicum.yandex.ru">Узнать больше</a>
            </button>
        </section>
    )
}

export default Promo;

