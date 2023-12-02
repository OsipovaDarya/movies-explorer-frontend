import { SHORT_FILM } from "./constans";

const renderMovies = (movies, keyWord, isShort) => {
    const word = keyWord.toLowerCase().trim();

    const filterForMovies = movies
        .filter((movie) => {
            const ruName = movie.nameRU && movie.nameRU.toLowerCase().trim();
            const enName = movie.nameEN && movie.nameEN.toLowerCase().trim();
            return (ruName.match(word)) || (enName && enName.match(word));
        });

    if (isShort)
        return filterForMovies.filter((movie) => movie.duration <= SHORT_FILM);

    return filterForMovies;
};

export { renderMovies };