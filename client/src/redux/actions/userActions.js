import axios from 'axios';

export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

export const changePassword = (email, oldPassword, newPassword) => async (dispatch) => {
  try {
    await axios.post('/api/users/change-password', { email, oldPassword, newPassword });
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    return Promise.resolve();  // Indica que la acción fue exitosa
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.response?.data?.error || 'Unknown error' });
    return Promise.reject(error.response?.data?.error || 'Unknown error');  // Indica que la acción falló
  }
};
