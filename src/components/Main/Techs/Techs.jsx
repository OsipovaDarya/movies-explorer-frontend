function Techs(props) {
    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__text">  На курсе веб-разработки мы освоили&nbsp;технологии, которые применили в
                дипломном проекте.</p>
            <ul className="techs__conatainer">
                <li className="techs__texnolog">HTML</li>
                <li className="techs__texnolog">CSS</li>
                <li className="techs__texnolog">JS</li>
                <li className="techs__texnolog">React</li>
                <li className="techs__texnolog">Git</li>
                <li className="techs__texnolog">Express.js</li>
                <li className="techs__texnolog">mongoDB</li>
            </ul>
        </section>
    )
}
export default Techs;