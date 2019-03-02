import { login, signup, updateJwt } from "../util/api";
import { socket } from "../socket/api";
import jwtDecode from "jwt-decode";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

const app = "hello";

const loginRequest = { type: LOGIN_REQUEST };
const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  socket: socket.emit("USER_CONNECTED", jwtDecode(token).user),
  token
});
const loginError = error => ({ type: LOGIN_ERROR, error });

export const attemptLogin = (username, password) => async dispatch => {
  dispatch(loginRequest);
  try {
    const token = await login(username, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

const signupRequest = { type: SIGNUP_REQUEST };
const signupSuccess = token => ({ type: SIGNUP_SUCCESS, token });
const signupError = error => ({ type: SIGNUP_ERROR, error });

export const attemptSignup = (username, password) => async dispatch => {
  dispatch(signupRequest);
  try {
    const token = await signup(username, password);
    dispatch(signupSuccess(token));
  } catch (error) {
    dispatch(signupError(error));
  }
};

export const UPDATE_JWT_REQUEST = "UPDATE_JWT_REQUEST";
export const UPDATE_JWT_SUCCESS = "UPDATE_JWT_SUCCESS";
export const UPDATE_JWT_ERROR = "UPDATE_JWT_ERROR";

const updateJwtRequest = { type: UPDATE_JWT_REQUEST };
const updateJwtSuccess = token => ({ type: UPDATE_JWT_SUCCESS, token });
const updateJwtError = error => ({ type: UPDATE_JWT_ERROR, error });

export const attemptJwtUpdate = token => async dispatch => {
  dispatch(updateJwtRequest);
  try {
    const newToken = await updateJwt(token);
    dispatch(updateJwtSuccess(newToken));
  } catch (error) {
    dispatch(updateJwtError(error));
  }
};

export const LOGOUT = "LOGOUT";
export const logout = () => ({ type: LOGOUT, socket: socket.emit("LOGOUT") });

export const updateClientUser = user => {
  return {
    type: "UPDATE_CLIENT_USER",
    payload: user
  };
};

export const updateClientOpponent = user => {
  return {
    type: "UPDATE_CLIENT_OPPONENT",
    payload: user
  };
};
