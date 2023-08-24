import { Link } from "react-router-dom";
import { useState } from "react";
import ValidationForm from "../../utils/Validation";

function Login(props) {

    const { handleChange, errors, formsValue } = ValidationForm();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        props.onRegister({ email, password });
    }

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
                />
                <span className="login__text-error">{errors.password}</span>
                <button className="login__button" type="submit">
                    Войти
                </button>

            </form>
            <div className="login__link">Ещё не зарегистрированы?<Link className="login__signin" to="/signup">Регистрация</Link></div>

        </main>
    )
}
export default Login;