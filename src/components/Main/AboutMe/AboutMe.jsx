import photo from "../../../images/myPhoto.jpg"
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {

    return (
        <section className="about-me">
            <div className="about-me__container">
                <div className="about-me__information">
                    <h2 className="about-me__title">Дарья</h2>
                    <h3 className="about-me__subtitle">Фронтенд-разработчик, 28 лет</h3>
                    <p className="about-me__text">Я живу в Москве. У меня есть муж
                        и сын. Я люблю слушать музыку, рисовать, играть в комьютерные игры. Недавно начала кодить. Мне эта профессия по душе, нравится смотреть как могут работать сайты, делать их функционал более удобным и понятным пользователю. </p>
                    <a className="about-me__github" href="https://github.com/OsipovaDarya?tab=repositories" target="blank" rel="noreferrer" >Github</a>
                </div>
                <img className="about-me__photo" src={photo} alt="мое фото" />
            </div>


            <Portfolio />
        </section >
    )

}

export default AboutMe;