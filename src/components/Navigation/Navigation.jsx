import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import akk from '../../images/akk.svg'

function Navigation({ loggedIn }) {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const location = useLocation();

    const toggleBurger = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    return (
        <nav className='navigation'>
            {loggedIn
                ? (
                    <>
                        <div className={location.pathname === '/' ? 'navigation__container' : 'navigation__container'}>
                            <Link to='/movies' className={location.pathname === '/movies' ? 'navigation__link_active link' : 'navigation__films link'}>Фильмы</Link>
                            <Link to='/saved-movies' className={location.pathname === '/saved-movies' ? 'navigation__link_active link' : 'navigation__link link'}>Сохраненные фильмы</Link>
                            <div className='navigation__profile'>
                                <Link to='/profile' className='navigation__account-link link'>Аккаунт</Link>
                                <div className='navigation__profile'>
                                    <img className='navigation__profile-logo' src={akk} alt="логотип человека" />
                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    <div className='navigation__links'>
                        <Link to='/signup' className='navigation__auth-item link'>Регистрация</Link>
                        <Link to='/signin' className='navigation__auth-item-active'>Войти</Link>
                    </div>
                )
            }

            {
                loggedIn && !isBurgerMenuOpen
                    ? (
                        <button className='navigation__burger-menu button' onClick={toggleBurger} />
                    ) : (
                        <BurgerMenu onClose={toggleBurger} loggedIn={loggedIn} />
                    )
            }

        </nav >
    )
}

export default Navigation;