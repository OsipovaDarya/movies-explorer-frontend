import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
    return (
        <header className={props.loggedIn ? 'header_nav' : 'header'} >
            <div className='header__content'>

                <Link to="/" className='header__logo'>
                    <img alt='Лого проекта' src={logo} />
                </Link>

                <Navigation loggedIn={props.loggedIn} />
            </div>
        </header>
    )
}