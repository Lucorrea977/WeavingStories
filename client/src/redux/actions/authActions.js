
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
        return Promise.resolve();  // Indica que la acción fue exitosa
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.error || 'Unknown error' });
        return Promise.reject(error.response?.data?.error || 'Unknown error');  // Indica que la acción falló
    }
};

export const register = (email, password) => async (dispatch) => {
    try {
        await axios.post('http://localhost:3001/api/auth/register', { email, password });
        dispatch({ type: REGISTER_SUCCESS });
        return Promise.resolve();  // Indica que la acción fue exitosa
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response?.data?.error || 'Unknown error' });
        return Promise.reject(error.response?.data?.error || 'Unknown error');  // Indica que la acción falló
    }
};