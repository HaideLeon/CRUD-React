import React from 'react';
import Cookies from 'universal-cookie';
import '../styles/NavBar.css'

const NavBar = () => {
    const cookies = new Cookies();

    const onLogout = () => {
        cookies.remove('token');
        cookies.remove('name');
        window.location.reload();
    };

    return (
        <nav className='nav-bar'>
            <div>
                <a href='/'>
                    {/* <img className='nav-logo' src={logo} /> */}
                </a>
                {/* <a className='btn nav-item' href='/'></a> */}
            </div>
            <a onClick={onLogout} className='btn btn-outline-danger'>Cerrar sesión</a>
        </nav>
    );
}

export default NavBar;