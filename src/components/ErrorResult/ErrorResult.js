import React from 'react';
import { Link } from 'react-router-dom';

function ErrorResult() {
    return (
        <main className="error-result">
            <div className="error-result__code">404</div>
            <p className="error-result__text">Страница не найдена</p>
            <Link className="error-result__back" to="/">Назад</Link>
        </main>
    )
}

export default ErrorResult;