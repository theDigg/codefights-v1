import { SET_ONLINE_USERS, GET_ONLINE_USER } from "../actions/types";

const inititalState = {
  users: [],
  user: {}
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {
        ...state,
        users: action.payload
      };

    case GET_ONLINE_USER:
      return {
        ...state,
        user: action.payload
      };

    case "UPDATE_CLIENT_USER":
      let updatedUsers = state.users;
      updatedUsers[action.payload.username] = action.payload;
      return {
        ...state,
        users: updatedUsers
      };

    case "UPDATE_CLIENT_OPPONENT":
      let updatedUsers2 = state.users;
      updatedUsers2[action.payload.username] = action.payload;
      return {
        ...state,
        users: updatedUsers2
      };

    default:
      return state;
  }
};
