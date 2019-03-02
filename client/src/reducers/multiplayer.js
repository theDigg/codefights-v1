import {
  CLEAR_PROMPT,
  CHANGE_ROOM,
  SET_COMPLETE,
  USER_SUBMITION,
  SOLUTION_CHANGE,
  CLEAR_ALL_INPUTS,
  TIMER_CHANGE,
  RESET_TIMER,
  RESET_RESULTS
} from "../actions/types";

import { SUBMITION_SUCCESS, GET_CHALLENGE_SUCCESS } from "../actions/prompt";

const initialState = {
  title: "Get ready...",
  body: "Click join and wait for the game to start",
  solution: "",
  tests: [],
  testDescriptions: [],
  testResults: [],
  loading: false,
  results: [],
  timer: null,
  message: "",
  isComplete: false,
  room: "lobby",
  submition_status: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TIMER_CHANGE:
      return {
        ...state,
        timer: action.payload
      };

    case RESET_TIMER:
      return {
        ...state,
        timer: null
      };

    case RESET_RESULTS:
      return {
        ...state,
        testResults: [],
        loading: true
      };

    case GET_CHALLENGE_SUCCESS:
      return {
        ...state,
        title: action.challenge.title,
        body: action.challenge.body,
        solution: action.challenge.solution,
        tests: action.challenge.tests,
        testDescriptions: action.challenge.testDescriptions,
        isComplete: false,
        room: "",
        loading: false
      };

    case CLEAR_PROMPT:
      return {
        ...state,
        title: "Get ready...",
        body: "Keep playing : ) ",
        solution: "",
        results: [],
        testDescriptions: [],
        testResults: [],
        message: "",
        isComplete: false,
        room: "waiting",
        loading: false
      };

    case SUBMITION_SUCCESS:
      return {
        ...state,
        results: action.data.results,
        testResults: action.data.testResults,
        message: action.data.message
      };

    case USER_SUBMITION:
      return {
        ...state,
        submition_status: action.payload
      };

    case SET_COMPLETE:
      return {
        ...state,
        isComplete: action.payload
      };

    case CHANGE_ROOM:
      return {
        ...state,
        room: action.payload
      };

    case SOLUTION_CHANGE:
      return {
        ...state,
        [action.payload.inputType]: action.payload.input
      };

    case CLEAR_ALL_INPUTS:
      return {
        ...state,
        submition_status: ""
      };

    default:
      return state;
  }
};
