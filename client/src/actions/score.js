import { CHANGE_SCOREBOARD, CLEAR_SCOREBOARD } from "./types";
import { getLeaderboard } from "../util/api";

export const getRatings = () => async dispatch => {
  dispatch({ type: "LEADERBOARD_REQUEST" });
  try {
    const users = await getLeaderboard();
    dispatch({ type: "LEADERBOARD_SUCCESS", payload: users });
  } catch (error) {
    dispatch({ type: "LEADERBOARD_ERROR" });
  }
};

export const onScoreboardChange = scoreboard => {
  return dispatch => {
    dispatch({
      type: CHANGE_SCOREBOARD,
      payload: scoreboard
    });
  };
};

export const clearScoreboard = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SCOREBOARD
    });
  };
};
