import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { CurrentUserContext } from "../../ErrorResult/Context/CurrentUserContext";
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';


function MoviesCardList({ movies, isDeletePage }) {
    const { pathname } = useLocation();
    const { savedMovies } = useContext(CurrentUserContext);

    const [isMoreButton, setIsMoreButton] = useState(false);
    const [cardCounter, setCardCounter] = useState(0);
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
    const handleChangeDisplaySize = () => setDisplayWidth(window.innerWidth);



    useEffect(() => {
        window.addEventListener('resize', handleChangeDisplaySize);
        return () => {
            window.removeEventListener('resize', handleChangeDisplaySize);
        };
    }, []);

    useEffect(() => {
        if (displayWidth <= 480) {
            setCardCounter(5);
        } else if (displayWidth <= 1010) {
            setCardCounter(8);
        } else {
            setCardCounter(12);
        }
    }, [displayWidth, movies.length]);

    useEffect(() => {
        if (pathname === '/movies' || pathname === '/saved-movies') {
            setIsMoreButton(movies.length > cardCounter);
        } else {
            setIsMoreButton(false);
        }
    }, [pathname, movies.length, cardCounter]);

    const handleButtonMore = () => {
        setCardCounter((current) => {
            return current + (displayWidth <= 1010 ? 2 : 3);
        })
    }

    const checkIsSave = (movie) => {
        const findedFilms = savedMovies.find((item) => item.movieId === (movie.movieId || movie.id));
        return findedFilms
            ? { isSaved: true, id: findedFilms._id }
            : { isSaved: false, id: '' }
    };

    const renderMovieCards = () => {
        function renderAllMovies(movies) {
            return movies.slice(0, cardCounter).map(movie =>

            (
                <MoviesCard
                    movie={movie}
                    isSavedMoviePage={isDeletePage}
                    key={movie.id}
                    saveStatus={checkIsSave(movie)}
                />
            ));
        }

        function renderSavedMovies(movies) {

            return movies.map(movie =>
            (
                <MoviesCard
                    movie={movie}
                    isSavedMoviePage={isDeletePage}
                    key={movie.movieId}
                    saveStatus={{ isSaved: true, id: movie._id }}
                />
            ));
        }


        return pathname.toLowerCase() === '/movies' ? renderAllMovies(movies) : renderSavedMovies(movies)
    };

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__list">
                {renderMovieCards()}
            </ul>
            {isMoreButton && <button onClick={handleButtonMore} type="button"
                className="movies-card-list__bth" aria-label="Кнопка еще">Ещё</button>
            }
        </section>
    )

}

export default MoviesCardList;