import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';

const Header = () => {

    const { user, authenticatedUser, logOut } = useContext(AuthContext);

    useEffect(()=> {
        authenticatedUser();
        // eslint-disable-next-line
    }, [])

    return (
        <header className = "app-header">

        {
            user && (
            <p className = "nombre-usuario"><span>Hi there! {user.name}</span></p>)
        }

            <nav className = "nav-principal">
                <button 
                    className = "btn btn-blank cerrar-sesion"
                    onClick = {()=> logOut()}
                >LogOut</button>
            </nav>
        </header>

    );
}
 
export default Header;