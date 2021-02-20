import React, { useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const PrivateRoute = ({component: Component, ...props}) => {
    
    const { authenticated, authenticatedUser, loading } = useContext(AuthContext);
 
    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            {...props}
            render = {props => !authenticated && !loading ? (
                <Redirect to = "/" />
            ) : (
                <Component {...props} />
            )}
        />
    );
}
 
export default PrivateRoute;