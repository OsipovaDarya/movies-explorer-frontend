import { useContext, useState, useRef, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../ErrorResult/Context/CurrentUserContext";
import Validation from "../../utils/Validation";
import api from "../../utils/MainApi";




function Profile({ onSignOut, setRegistrForm, setIsEditInfoTooltip }) {
    const currentContext = useContext(CurrentUserContext);
    const [currentUser, setCurrentUser] = useState(currentContext.currentUser);
    const initialValues = {
        username: currentUser.name,
        email: currentUser.email,
    };
    const { handleChange, formsValue, errors, isValid, resetForm } = Validation(initialValues);
    const [isEdit, setIsEdit] = useState(false);
    const [renderingloading, setRenderingloading] = useState(false);


    function onUpdateUser(value) {
        setRenderingloading(true);
        api
            .editProfile(value)
            .then((user) => {
                setCurrentUser(user);
                setIsEditInfoTooltip(true);
                setRegistrForm({
                    status: true,
                    text: "Редактирование успешно заверешено",
                })
            })
            .catch(err => {
                console.log('fsd', err);
                setRegistrForm({
                    status: false,
                    text: "Не удалось редактировать",
                })
                setIsEditInfoTooltip(true);
            })
            .finally(() => {
                setRenderingloading(false);
            })
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        setRenderingloading(true);
        onUpdateUser({
            name: formsValue.name,
            email: formsValue.email,
        }
        );
        setRenderingloading(false);
        setCurrentUser(currentUser);
        setIsEdit(false);
        resetForm(currentUser, {}, true);
    };

    // Редактировать профиль
    function handleEditButton(evt) {
        evt.preventDefault();


        setIsEdit(true);


    };

    const isButtonActive = isValid
        && !renderingloading
        && (formsValue.name !== initialValues.username || formsValue.email !== initialValues.email);

    //
    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm])


    return (
        <main className="profile">
            <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__container">
                    <div className="profile__label" htmlFor='name'>Имя</div>
                    <input className="profile__input"
                        type='text'
                        id='name'
                        placeholder='Name'
                        name='name'
                        minLength={2}
                        maxLength={30}
                        value={formsValue.name || ''}
                        onChange={handleChange}
                        required
                        disabled={renderingloading || !isEdit}></input>
                </div>
                <span className='profile__text-error' id='name-error'>{errors.name}</span>
                <p className="profile__line"></p>
                <div className="profile__container">
                    <div className="profile__label" htmlFor='email'>Email</div>
                    <input className="profile__input" type='email'
                        id='email'
                        placeholder='email'
                        name='email'
                        value={formsValue.email || ''}
                        onChange={handleChange}
                        minLength={5}
                        maxLength={40}
                        required
                        disabled={renderingloading || !isEdit}>
                    </input>
                </div>
                <span className='profile__text-error' id='email-error'>{errors.email}</span>


                {isEdit ?
                    <button className="profile__button" type='submit' disabled={!isButtonActive}>Сохранить</button>
                    :
                    <button className="profile__button-save" type="button" onClick={handleEditButton}>Редактировать</button>}

                {!isEdit ?
                    <button className="profile__button-exit" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
                    : ''}

            </form>
        </main >
    )
}
export default Profile;



