import React, { useState } from 'react';
import '../styles/LoginScreen.css';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onLogin = (e) => {
        console.log(e);
        e.preventDefault();
        if (email === 'haideleon@gmail.com') {
            if (password === 'haideleon1') {
                cookies.set('name', 'Haide');
                cookies.set('token', 'hai10101');
                window.location.reload();
            }
        }
    }

    return (
        <div className='background-container'>
            <div className='background-card'>
                {/* <img className='logo'  src={logo}alt={'Logo'} /> */}
                <h2>Iniciar sesión</h2>
                <form onSubmit={onLogin}>
                    <div className='inputs-container'>
                        <input onChange={(e) => setEmail(e.target.value)} type={'email'} className={'form-control'} placeholder={'Correo'} />
                        <input onChange={(e) => setPassword(e.target.value)} type={'password'} className={'form-control'} placeholder={'Contraseña'} />
                        <input type={'submit'} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;