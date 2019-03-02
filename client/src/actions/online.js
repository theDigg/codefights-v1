import { SET_ONLINE_USERS } from "./types";

export const setOnline = users => {
  return dispatch => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: users
    });
  };
};
