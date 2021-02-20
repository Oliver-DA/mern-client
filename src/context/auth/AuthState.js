import React, { useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { AuthContext } from './AuthContext';
import axiosClient from '../../config/axios';
import authToken from '../../config/authToken';

import {
    SUCCESSFULL_REGISTRATION,
    REGISTRATION_ERROR,
    LOGING_ERROR,
    SUCCESSFULL_LOGIN,
    GET_USER,
    LOG_OUT
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //FUNCTIONS
    const registerUser = async (userData) => {

        try {
            const response = await axiosClient.post("/api/users", userData)

            dispatch({
                type: SUCCESSFULL_REGISTRATION,
                payload: response.data
            });

            authenticatedUser();

        } catch(err) {
            const alert = {
                msg: err.response.data.msg,
                cat: "alerta-error"
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            })
        }
    }

    const authenticatedUser = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            authToken(token);
        }

        try {
            const response = await axiosClient.get("/api/auth");
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

            
        }catch(err) {
            console.log(err.response)
            dispatch({
                type: LOGING_ERROR
            })
        }
    }

    const logIn = async (userData) => {

        try {
            const response = await axiosClient.post("/api/auth", userData);
            dispatch({
                type: SUCCESSFULL_LOGIN,
                payload: response.data
            });

            authenticatedUser()
        } catch(err) {
            const alert = {
                msg: err.response.data.msg,
                cat: "alerta-error"
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            })
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <AuthContext.Provider
            value = {{ 
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                logIn,
                authenticatedUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState