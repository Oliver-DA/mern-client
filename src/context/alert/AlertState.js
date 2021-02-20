import React, { useReducer } from 'react';
import { AlertContext } from './AlertContext';
import AlertReducer from './AlertReducer';

import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types';

const AlertState = (props) => {

    const initialState = {
        alert: null
    };

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //FUNCTIONS
    const showAlert = (msg, cat) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                cat
            }
        });

        setTimeout(()=> {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000)
    }

    return (
        <AlertContext.Provider
            value = {{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;