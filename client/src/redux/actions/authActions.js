
import axios from 'axios';

export const AUTH_ACTIONS = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/users/register', formData);
    dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: response.data });
    console.log(response.data);
    return response.data; // Devuelve la respuesta para manejarla en el componente
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: error });
    console.error('Error al registrar usuario:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const loginUser = (formData) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', formData);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data });
      console.log(response.data);
      return response.data; // Devuelve la respuesta para manejarla en el componente
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error });
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/password/forgot-password', formData);
    dispatch({ type: AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS, payload: response.data });
    console.log(response.data);
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.FORGOT_PASSWORD_FAILURE, payload: error });
    console.error('Error al solicitar restablecimiento de contraseña:', error);
  }
};

export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:3001/api/password/reset-password/${token}`, formData);
    dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS, payload: response.data });
    console.log(response.data);
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE, payload: error });
    console.error('Error al restablecer la contraseña:', error);
  }
};
