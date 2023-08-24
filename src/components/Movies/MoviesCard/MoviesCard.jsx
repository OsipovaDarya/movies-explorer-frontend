import { useState } from "react";



function MoviesCard(props) {
    const { nameRU, duration, trailerLink, image } = props.movie;
    const { isDeletePage } = props;

    const imageSource = 'https://api.nomoreparties.co';
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeStatus = (isLiked) => {
        return isLiked ? "movies-card__like movies-card__like_active " : 'movies-card__like'
    }

    const handleLike = () => {
        setIsLiked(prev => !prev)
    }
    const handleRemove = () => { }

    return (
        <li className="movies-card__card">
            <section className="movies-card">
                <div className="movies-card__body">
                    <div className="movies-card__name">{nameRU}</div>
                    <div className="movies-card__duration">{`${duration}${' минут'}`}</div>
                    <button className={isDeletePage ? "movies-card__delete" : handleLikeStatus(isLiked)} aria-label="Сохранить фильм" onClick={() => isDeletePage ? handleRemove() : handleLike()}>
                    </button>
                </div>
                <a href={trailerLink} className="movies-card__link" target="_blank" rel="noreferrer">
                    <img className="movies-card__photo" src={`${imageSource}${image.url}`} alt={nameRU} />
                </a>
            </section>

        </li>
    )
}

export default MoviesCard;