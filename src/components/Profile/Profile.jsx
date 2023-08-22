import { Link } from "react-router-dom";


function Profile() {



    const ButtonClick = () => {
        console.log('Редактировать');
    }


    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form" >
                <div className="profile__container">
                    <div className="profile__label">Имя</div>
                    <div className="profile__name">Виталий</div>
                </div>
                <p className="profile__line"></p>
                <div className="profile__container">
                    <div className="profile__label">Email</div>
                    <div className="profile__name">pochta@yandex.ru</div>
                </div>

            </form>
            <button className="profile__button" type="button" onClick={ButtonClick}>Редактировать</button>
            <button className="profile__button" type="button"><Link className="profile__signin" to="/signin">Выйти из аккаунта</Link></button>

        </section >
    )
}
export default Profile;