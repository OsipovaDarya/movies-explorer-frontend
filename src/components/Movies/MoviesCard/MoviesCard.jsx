import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../ErrorResult/Context/CurrentUserContext";
import { useContext } from "react";
import api from "../../../utils/MainApi";



function MoviesCard({ movie, isSavedMoviePage, saveStatus }) {

    const { nameRU, duration, trailerLink } = movie;
    const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);
    const [isSavedMovie, setIsSavedMovie] = useState(saveStatus.isSaved);
    const [renderingloading, setRenderingloading] = useState(false)
    const [saveId, setSaveId] = useState(saveStatus.id);
    const imageSource = 'https://api.nomoreparties.co';
    const { pathname } = useLocation();



    // сохранить фильм
    function handleSaveMovies() {
        setRenderingloading(true);

        if (isSavedMovie) {
            setIsSavedMovie(false)
            setSavedMovies(savedMovies.filter((item) => {
                return !(item._id === saveId);
            }));
            setSaveId(false);
            api.deleteMovies(saveId)
                .then((data) => {
                    setSavedMovies(savedMovies.filter((item) => {
                        return !(item._id === saveId);
                    }));
                    setIsSavedMovie(false);
                })
                .catch(err => {
                    console.log("Не удалось удалить фильм");
                })
                .finally(() => {
                    setRenderingloading(false);
                })

            return
        }
        api.saveMovies(movie)
            .then((data) => {
                setSavedMovies([...savedMovies, data]);
                setIsSavedMovie(true);
                setSaveId(data._id);
            })
            .catch(err => {
                console.log(err)
                console.log("Не удалось сохранить фильм, попробуйте позднее");
            })
            .finally(() => {
                setRenderingloading(false);
            })
    };

    const getMovieUrl = (movie) => {
        return pathname === '/movies' ? `${imageSource}${movie.image.url}` : movie.image;
    };

    function handleDeleteMovies() {
        api.deleteMovies(saveId)
            .then((data) => {
                setSavedMovies(savedMovies.filter((item) => {
                    return !(item._id === saveId);
                }));
                setIsSavedMovie(false);
            })
            .catch(err => {
                console.log("Не удалось удалить фильм");
            })
            .finally(() => {
                setRenderingloading(false);
            })
    }

    return (
        <li className="movies-card__card">
            <section className="movies-card">
                <div className="movies-card__body">
                    <div className="movies-card__name">{nameRU}</div>
                    <div className="movies-card__duration">{`${duration}${' минут'}`}</div>
                    <button className={isSavedMoviePage ? "movies-card__delete" : (isSavedMovie ? "movies-card__like_active" : "movies-card__like ")} aria-label="Сохранить фильм" type="button"
                        onClick={isSavedMoviePage ? handleDeleteMovies : handleSaveMovies} >
                    </button>
                </div>
                <a href={trailerLink} className="movies-card__link" target="_blank" rel="noreferrer">
                    <img className="movies-card__photo" src={getMovieUrl(movie)} alt={nameRU} />
                </a>
            </section>

        </li>
    )
}

export default MoviesCard;