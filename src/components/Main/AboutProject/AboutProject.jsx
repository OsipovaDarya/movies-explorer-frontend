function AboutProject(props) {

    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов
                    <p className="about-project__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </h3>
                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель
                    <p className="about-project__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </h3>
            </div>
            <div className="about-project__time-work">
                <h4 className="about-project__one-week">1 неделя</h4>
                <h4 className="about-project__four-week">4 недели</h4>
                <p className="about-project__backend">Back-end</p>
                <p className="about-project__frontend">Front-end</p>
            </div>
            <div className="about-project__language">
            </div>
        </section >
    )


}
export default AboutProject;