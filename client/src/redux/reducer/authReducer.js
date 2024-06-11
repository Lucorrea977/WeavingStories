
import { combineReducers } from 'redux';
import { AUTH_ACTIONS } from '../actions/authActions';

// Reducer para el estado de autenticación
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.error,
      };
    case AUTH_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

// Reducer para el estado de cambio de contraseña
const passwordReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    case AUTH_ACTIONS.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        message: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Combinar los reducers
const rootReducer = combineReducers({
  auth: authReducer,
  password: passwordReducer,
});

export default rootReducer;
