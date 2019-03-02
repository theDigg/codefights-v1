import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT
} from "../actions/auth";
import { hideErrorClearTimeout, showErrorWithTimeout } from "../actions/error";

export default store => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGOUT:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      store.dispatch(showErrorWithTimeout(action.error));
      break;

    default:
      break;
  }
};
