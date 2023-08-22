import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, isDeletePage }) {
    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__list">
                {movies.map((item) => {
                    return (
                        <MoviesCard
                            movie={item}
                            key={item.id}
                            isDeletePage={isDeletePage}
                        />)
                })}
            </ul>
            <button type="button" className="movies-card-list__bth" aria-label="Кнопка еще">Ещё</button>
        </section>
    )

}

export default MoviesCardList;