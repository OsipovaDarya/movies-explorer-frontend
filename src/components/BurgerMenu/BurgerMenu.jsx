import { Link, useLocation } from 'react-router-dom';
import Human from '../../images/human.svg'

function BurgerMenu({ onClose, loggedIn }) {
    const location = useLocation();

    return (
        <section className={loggedIn ? 'burger-menu' : 'burger-menu burger-menu_hide'}>
            <div className='burger-menu__body'>

                <div className='burger-menu__container'>
                    <button
                        className='burger-menu__button-close'
                        type='button'
                        aria-label='закрыть меню'
                        onClick={() => onClose()}
                    />

                    <div className='burger-menu__links'>
                        <Link to='/' className={location.pathname === '/' ? 'burger-menu__link ' : 'burger-menu__link'}>Главная</Link>
                        <Link to='/movies' className={location.pathname === '/movies' ? 'burger-menu__link ' : 'burger-menu__link'}>Фильмы</Link>
                        <Link to='/saved-movies' className={location.pathname === '/saved-movies' ? 'burger-menu__link ' : 'burger-menu__link'}>Сохранённые фильмы</Link>
                    </div>
                    <div className='burger-menu__account-container'>
                        <Link to='/profile' className='burger-menu__account'>Аккаунт</Link>
                        <img className='burger-menu__picture' src={Human} alt="портрет человечка" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerMenu;