import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }


    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onRegister({ email, password });
    }


    return (
        <section className="login">
            <Link to="/" className="login__logo"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">Email</label>
                <input className="login__input"
                    id="email" name="email" type="email"
                    value={email || ''}
                    onChange={handleEmailChange}
                />

                <label className="login__label">Пароль</label>
                <input className={`login__input ${props.onError && 'login__input_error'}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span id="form-error" className="login__error">{props.onError && 'Что-то пошло не так...'}</span>
                <button className="login__button" type="submit">
                    Войти
                </button>

            </form>
            <div className="login__link">Ещё не зарегистрированы?<Link className="login__signin" to="/signup">Регистрация</Link></div>

        </section>
    )
}
export default Login;