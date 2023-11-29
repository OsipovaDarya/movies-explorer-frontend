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
    const [isEdit, setIsEdit] = useState(false); // редактируем инфу о себе
    const [renderingloading, setRenderingloading] = useState(false);
    const nameInputRef = useRef(false);

    function onUpdateUser(value) {
        setRenderingloading(true);
        api
            .editProfile(value)
            .then((user) => {
                console.log('asfasfasf', user)
                setCurrentUser(user);
                setIsEditInfoTooltip(true);
                setRegistrForm({
                    status: true,
                    text: "Редактирование успешно заверешено",
                })
                setTimeout(() => {
                    setIsEditInfoTooltip(false);
                    setRenderingloading(false);
                }, 2000);
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

        nameInputRef.current.focus();

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
                        ref={nameInputRef}
                        required
                        minLength={2}
                        maxLength={30}
                        placeholder='Name'
                        name='name'
                        value={formsValue.name || ''}
                        onChange={handleChange}
                        disabled={renderingloading || !isEdit}></input>
                </div>
                <span className='profile__error name-error' id='name-error'>{errors.name}</span>
                <p className="profile__line"></p>
                <div className="profile__container">
                    <div className="profile__label" htmlFor='email'>Email</div>
                    <input className="profile__input" type='email'
                        id='email'
                        required
                        minLength={4}
                        maxLength={40}
                        placeholder='email'
                        name='email'
                        value={formsValue.email || ''}
                        onChange={handleChange}
                        disabled={renderingloading || !isEdit}></input>
                </div>
                <span className='profile__error email-error' id='email-error'>{errors.email}</span>


                {isEdit ?
                    <button className="profile__button" type='submit' disabled={!isButtonActive}>Сохранить</button>
                    :
                    <button className="profile__button-save" type="button" onClick={handleEditButton}>Редактировать</button>}

                {!isEdit ?
                    <button className="profile__button-exit" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
                    : ''}
                {renderingloading ? <Preloader /> : ''}
            </form>
        </main >
    )
}
export default Profile;