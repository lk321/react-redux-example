import axios from 'axios';
import { browserHistory } from 'react-router';
const API_URL = 'http://g-global.com.mx:8181/';

/**
 * Error helper
 */
export function authError(CONST, error) {
    return {
        type: CONST,
        payload: error,
    };
}

/**
 * Sign in
 */
export function signinUser(props) {
    const { email, password } = props;

    return function(dispatch) {
        axios.post(`${API_URL}/api/signin`, { email, password })
            .then(response => {
                localStorage.setItem('user_logged', JSON.stringify(response.data));

                dispatch({ type: "AUTH_USER" });

                browserHistory.push("/home");
            })
            .catch(() => dispatch(authError("SIGNIN_FAILURE", "Email or password isn't right")));
    }
}
