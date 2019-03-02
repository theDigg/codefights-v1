import {
  GET_DAILY_LEADERBOARD,
  CHANGE_SCOREBOARD,
  CLEAR_SCOREBOARD
} from "../actions/types";

const initialState = {
  daily: [],
  leaderboard: [],
  scoreboard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DAILY_LEADERBOARD:
      return {
        ...state,
        daily: action.payload
      };

    case "LEADERBOARD_SUCCESS":
      return {
        ...state,
        leaderboard: action.payload
      };

    case CHANGE_SCOREBOARD:
      return {
        ...state,
        scoreboard: action.payload
      };

    case CLEAR_SCOREBOARD:
      return {
        ...state,
        scoreboard: []
      };

    default:
      return state;
  }
};
