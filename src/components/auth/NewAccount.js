import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alert/AlertContext';
import { AuthContext } from '../../context/auth/AuthContext';

const NewAccount = (props) => {

    //Context
    const { alert, showAlert } = useContext(AlertContext);
    const { registerUser, message, authenticated } = useContext(AuthContext);

    //State
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, password, confirmPassword } = user;

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
            showAlert("All fields are required", "alerta-error");
            return
        }

        if (password.length < 6) {
            showAlert("Password must be 6 characters long", "alerta-error");
            return
        }

        if (password !== confirmPassword) {
            showAlert("Passwords must match", "alerta-error")
            return
        }

        registerUser({
            name,
            email,
            password
        });
    }

    return (
        <div className = "form-usuario">
        { alert && (<div className = {`alerta ${alert.cat}`}>{alert.msg}</div>)}
            <div className = 'contenedor-form sombra-dark'>
                <h1>Create An Account</h1>

                <form onSubmit = {handleSubmit}>

                    <div className = "campo-form">
                        <label htmlFor = "name">Name</label>
                        <input
                            type = "text"
                            id = "name"
                            value = {name}
                            name = "name"
                            onChange = {handleChange}
                        />
                    </div>

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

                    <div className = "campo-form">
                        <label htmlFor = "confirm-password">Confirm Password</label>
                        <input
                            type = "password"
                            id = "confirm-password"
                            value = {confirmPassword}
                            name = "confirmPassword"
                            onChange = {handleChange}
                        />
                    </div>

                    <div className = "camp-form">
                        <input
                            className = "btn btn-primario btn-block"
                            type = "submit"
                            value = "Registrar"
                        />
                    </div>
                </form>

                <Link
                    to = "/"
                    className = "enlace-cuenta"
                >Go to LogIn</Link>
            </div>
        </div>
    );
}
 
export default NewAccount;