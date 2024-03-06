class MainApi {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
        const token = localStorage.getItem("jwt")
        if (token) this.setAuthToken(token);

    }
    setAuthToken(token) {
        this._headers.Authorization = `Bearer ${token}`;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }

    //Сохранить фильм
    saveMovies(movies) {
        const prepearedData = {
            country: movies.country,
            director: movies.director,
            duration: movies.duration,
            year: movies.year,
            description: movies.description,
            nameEN: movies.nameEN,
            nameRU: movies.nameRU,
            image: `https://api.nomoreparties.co${movies.image.url}`,
            trailer: movies.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movies.image.formats.thumbnail.url}`,
            movieId: movies.id,
        }

        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(prepearedData)
        })
            .then(this._checkResponse)
    }

    //Сохр фильмы
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: this._headers
        }).then(this._checkResponse);
    }

    //Удалить фильм
    deleteMovies(movieId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    //Инфо о пользователи
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    //Редактирование профиля

    editProfile(userInformaiton) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                userInformaiton
            ),
        })
            .then(this._checkResponse);
    }

    //Регистрация
    register = (name, email, password) => {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
    }

    //логин
    login = (email, password) => {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    }
    //проверить токен
    checkToken = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(this._checkResponse);
    }

}


const api = new MainApi({
    baseUrl: 'https://api.diplomdarya.nomoredomains.monster',
    headers: {
        "Content-type": 'application/json'

    }
});

export default api;