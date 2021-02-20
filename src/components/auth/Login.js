import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alert/AlertContext';
import { AuthContext } from '../../context/auth/AuthContext';

const Login = (props) => {

    //Context
    const { alert, showAlert } = useContext(AlertContext);
    const { authenticated, message, logIn } = useContext(AuthContext);

    //State
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

    useEffect(() => {
        if (authenticated) {
            props.history.push("/projects")
        }

        if (message) {
            showAlert(message.msg, message.cat)
        }

    }, [message, authenticated, props.history ])

    //Handlers
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (Object.values(user).some(ele => ele.trim() === "")) {
            return showAlert("All fields are required", "alerta-error")
        }

        logIn({ email, password });
    };

    return (
        <div className = "form-usuario">
            { alert && (<div className = {`alerta ${alert.cat}`}>{alert.msg}</div>)}
            <div className = 'contenedor-form sombra-dark'>
                <h1>Log In</h1>

                <form onSubmit = {handleSubmit}>
                    <div className = "campo-form">
                        <label htmlFor = "email">Email</label>
                        <input
                            type = "email"
                            id = "email"
                            value = {email}
                            name = "email"
                            onChange = {handleChange}
                        />
                    </div>

                    <div className = "campo-form">
                        <label htmlFor = "password">Password</label>
                        <input
                            type = "password"
                            id = "password"
                            value = {password}
                            name = "password"
                            onChange = {handleChange}
                        />
                    </div>

                    <div className = "camp-form">
                        <input
                            className = "btn btn-primario btn-block"
                            type = "submit"
                            value = "LogIn"
                        />
                    </div>
                </form>

                <Link
                    to = "new-account"
                    className = "enlace-cuenta"
                >Get a new account</Link>
            </div>
        </div>
    );
}
 
export default Login;