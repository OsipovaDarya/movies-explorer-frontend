import { Link } from "react-router-dom";
import { useState } from 'react';
import ValidationForm from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";


function Register({ handelRegistr, renderingloading }) {

    const { handleChange, errors, formsValue, resetForm, } = ValidationForm();
    function handleSubmit(evt) {
        evt.preventDefault();

        const resetFormBack = () => {
            resetForm();
        };

        handelRegistr(
            formsValue.name,
            formsValue.email,
            formsValue.password,
            resetFormBack
        )
        formsValue.password = "";
        formsValue.email = "";
        formsValue.name = "";;
    }
    const buttonDisables = !(
        errors.email === "" &&
        errors.password === "" &&
        errors.name === ""
    );
    const buttonClassName = buttonDisables
        ? "register__button_disabled"
        : "register__button";



    return (
        <main className="register">
            <Link to="/" className="register__logo"></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">Имя</label>
                <input className={!errors.name ? "register__input" : "register__input register__input_error"}
                    id="name" name="name" type="name"
                    value={formsValue.name || ''}
                    onChange={handleChange}
                    placeholder="Имя"
                    minLength="3"
                    required
                />
                <span className="register__text-error">{errors.name}</span>
                <label className="register__label">Email</label>
                <input className={!errors.email ? "register__input" : "register__input register__input_error"}
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    value={formsValue.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <span className="register__text-error">{errors.email}</span>
                <label className="register__label">Пароль</label>
                <input className={!errors.password ? "register__input" : "register__input register__input_error"}
                    id="password"
                    name="password"
                    type="password"
                    value={formsValue.password || ''}
                    onChange={handleChange}
                    placeholder="Пароль"
                    minLength="5"
                    required
                />
                <span className="register__text-error">{errors.password}</span>
                <button
                    className={buttonClassName} type="submit" disabled={buttonDisables} >
                    Зарегистрироваться
                </button>
                {renderingloading ? <Preloader /> : ''}
            </form>

            <div className="register__link">Уже зарегестрированы?<Link className="register__signin" to="/signin">Войти</Link></div>

        </main>
    )
}
export default Register;