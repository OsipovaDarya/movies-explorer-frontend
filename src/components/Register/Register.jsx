import { Link } from "react-router-dom";
import { useState } from 'react';

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onRegister({ name, email, password });
    }


    return (
        <section className="register">
            <Link to="/" className="register__logo"></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">Имя</label>
                <input className="register__input"
                    id="name" name="name" type="name"
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <label className="register__label">Email</label>
                <input className="register__input"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <label className="register__label">Пароль</label>
                <input className={`register__input ${props.onError && 'register__input_error'}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span id="form-error" className="register__error">{props.onError && 'Что-то пошло не так...'}</span>
                <button className="register__button" type="submit">
                    Зарегистрироваться
                </button>

            </form>
            <div className="register__link">Уже зарегестрированы?<Link className="register__signin" to="/signin">Войти</Link></div>

        </section>
    )
}
export default Register;