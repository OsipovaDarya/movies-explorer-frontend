import { Link } from "react-router-dom";
import { useState } from "react";
import ValidationForm from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";

function Login({ handleLogin, renderingloading }) {

    const { handleChange, errors, formsValue, resetForm } = ValidationForm();

    function handleSubmit(evt) {
        evt.preventDefault();

        const resetFormBack = () => {
            resetForm();
        }
        handleLogin(
            formsValue.email,
            formsValue.password,
            resetFormBack
        );
    };

    const buttonDisables = !(
        errors.email === "" &&
        errors.password === ""
    );

    const buttonClassName = buttonDisables
        ? "login__button_disabled"
        : "login__button";

    return (
        <main className="login">
            <Link to="/" className="login__logo"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">Email</label>
                <input className={!errors.email ? "login__input" : "login__input login__input_error"}
                    id="email" name="email" type="email"
                    value={formsValue.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    minLength="2"
                    required
                    action=''
                    noValidate
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
                <span className="login__text-error">{errors.email}</span>

                <label className="login__label">Пароль</label>
                <input className={!errors.password ? "login__input" : "login__input login__input_error"}
                    id="password"
                    name="password"
                    type="password"
                    value={formsValue.password || ''}
                    onChange={handleChange}
                    placeholder="password"
                    minLength="5"
                    required
                    noValidate
                />
                <span className="login__text-error">{errors.password}</span>
                <button className={buttonClassName} type="submit" disabled={buttonDisables}>Войти</button>

            </form>

            <div className="login__link">Ещё не зарегистрированы?<Link className="login__signin" to="/signup">Регистрация</Link></div>

        </main>
    )
}
export default Login;