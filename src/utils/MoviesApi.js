class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;

        this.__checkResponse = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        };
    }

    //Получить все фильмы
    getMovies() {
        return fetch(this._baseUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(this.__checkResponse);
    }
}



export const apiMovies = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});

