import {
  CLEAR_PROMPT,
  CHANGE_ROOM,
  SET_COMPLETE,
  SOLUTION_CHANGE,
  TIMER_CHANGE,
  RESET_TIMER
} from "./types";

import { submitSolution } from "../util/api";

export const addSolution = function(inputType, input, e) {
  if (e) {
    e.preventDefault();
  }
  return {
    type: SOLUTION_CHANGE,
    payload: {
      inputType,
      input
    }
  };
};

export const SUBMITION_REQUEST = "SUBMITION_REQUEST";
export const SUBMITION_SUCCESS = "SUBMITION_SUCCESS";
export const SUBMITION_ERROR = "SUBMITION_ERROR";

const submitionRequest = { type: SUBMITION_REQUEST };
const submitionSuccess = data => ({
  type: SUBMITION_SUCCESS,
  data
});
const submitionError = error => ({
  type: SUBMITION_ERROR,
  error
});

export const submit = solution => async dispatch => {
  dispatch(submitionRequest);
  try {
    const data = await submitSolution(solution);
    dispatch(submitionSuccess(data));
  } catch (error) {
    dispatch(submitionError(error));
  }
};

export const GET_CHALLENGE_SUCCESS = "GET_CHALLENGE_SUCCESS";

export const getChallenge = challenge => {
  return {
    type: GET_CHALLENGE_SUCCESS,
    challenge
  };
};

export const clearPrompt = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROMPT
    });
  };
};

export const changeRoom = room => {
  return dispatch => {
    dispatch({
      type: CHANGE_ROOM,
      payload: room
    });
  };
};

export const setComplete = () => {
  return dispatch => {
    dispatch({
      type: SET_COMPLETE,
      payload: true
    });
  };
};

export const onTimerChange = count => {
  return dispatch => {
    dispatch({
      type: TIMER_CHANGE,
      payload: count
    });
  };
};

export const resetTimer = () => {
  return dispatch => {
    dispatch({
      type: RESET_TIMER
    });
  };
};
