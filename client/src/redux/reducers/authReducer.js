import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authActions';

const initialState = {
  token: null,
  error: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
