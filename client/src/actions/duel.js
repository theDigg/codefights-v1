import {
  GET_PROMPT_DUEL,
  PLAYER_JOINED_DUEL,
  DUEL_SOLUTION_CHANGE,
  PLAYER_TYPING,
  OPPONENT_RESULTS,
  SET_CONSOLE_RESULTS,
  RESET_CONSOLE_RESULTS,
  CLEAR_OPPONENT_CONSOLE,
  CLEAR_DUEL_PROMPT,
  SET_DUEL_ROOM,
  SET_DUEL_COMPLETE,
  CLEAR_OPPONENT_PROMPT
} from "./types";

import { submitDuelSolution } from "../util/api";

export const setDuelComplete = () => {
  return {
    type: SET_DUEL_COMPLETE
  };
};

export const resetDuelFinished = () => {
  return {
    type: "RESET_DUEL_FINISHED"
  };
};

export const setDuelRoom = roomId => {
  return {
    type: SET_DUEL_ROOM,
    payload: roomId
  };
};

export const resetConsoleResults = () => {
  return {
    type: RESET_CONSOLE_RESULTS
  };
};

export const clearDuelPrompt = () => {
  return {
    type: CLEAR_DUEL_PROMPT
  };
};

export const clearOpponentConsole = () => {
  return {
    type: CLEAR_OPPONENT_CONSOLE
  };
};

export const clearOpponentPrompt = () => {
  return {
    type: CLEAR_OPPONENT_PROMPT
  };
};

export const setConsoleResults = results => {
  return {
    type: SET_CONSOLE_RESULTS,
    payload: results
  };
};

export const addDuelSolution = (inputType, input, e) => {
  if (e) {
    e.preventDefault();
  }
  return {
    type: DUEL_SOLUTION_CHANGE,
    payload: {
      inputType,
      input
    }
  };
};

export const opponentResults = results => {
  console.log(results);
  return {
    type: OPPONENT_RESULTS,
    payload: results
  };
};

export const getDuelPrompt = problem => {
  return {
    type: GET_PROMPT_DUEL,
    payload: problem
  };
};

export const playersJoinedDuel = players => {
  return {
    type: PLAYER_JOINED_DUEL,
    payload: players
  };
};

export const playerTyping = input => {
  return {
    type: PLAYER_TYPING,
    payload: input
  };
};

export const DUEL_SUBMITION_REQUEST = "DUEL_SUBMITION_REQUEST";
export const DUEL_SUBMITION_SUCCESS = "DUEL_SUBMITION_SUCCESS";
export const DUEL_SUBMITION_ERROR = "DUEL_SUBMITION_ERROR";

const duelSubmitionRequest = { type: DUEL_SUBMITION_REQUEST };
const duelSubmitionSuccess = data => ({
  type: DUEL_SUBMITION_SUCCESS,
  data
});
const duelSubmitionError = error => ({
  type: DUEL_SUBMITION_ERROR,
  error
});

export const submit = solution => async dispatch => {
  dispatch(duelSubmitionRequest);
  try {
    const data = await submitDuelSolution(solution);
    dispatch(duelSubmitionSuccess(data));
  } catch (error) {
    dispatch(duelSubmitionError(error));
  }
};
