import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../actions/userActions';

const initialState = {
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
