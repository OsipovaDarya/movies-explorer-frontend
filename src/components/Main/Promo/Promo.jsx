import logo from "../../../images/text__COLOR_landing-logo (1).png"

function Promo(props) {


    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__container-text">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <div className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</div>

                </div>
                <img className="promo__logo" src={logo} alt="логотип планета с буквами" />
            </div>
            <div className="promo__img"></div>
            <button className="promo__link" type="button">Узнать больше
            </button>
        </section>
    )
}

export default Promo;

