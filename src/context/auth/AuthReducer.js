import {
    SUCCESSFULL_REGISTRATION,
    REGISTRATION_ERROR,
    LOGING_ERROR,
    SUCCESSFULL_LOGIN,
    GET_USER,
    LOG_OUT
} from '../../types';

const AuthReducer = (state, action) => {

    switch (action.type) {

        case SUCCESSFULL_REGISTRATION:
        case SUCCESSFULL_LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }

        case REGISTRATION_ERROR:
        case LOGING_ERROR:
        case LOG_OUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }

        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }

        default: return state
    }
}

export default AuthReducer;