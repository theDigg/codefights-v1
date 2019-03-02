import {
  GET_PROMPT_DUEL,
  RESET_RESULTS_DUEL,
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
} from "../actions/types";
import { DUEL_SUBMITION_SUCCESS } from "../actions/duel";

import { LOGIN_SUCCESS, UPDATE_JWT_SUCCESS } from "../actions/auth";
import jwtDecode from "jwt-decode";

const intialState = {
  player: {},
  opponent: {},
  opponentConsole: [],
  opponentPassing: false,
  passing: false,
  title: "",
  body: "",
  solution: "",
  opponentSolution: "",
  console: [],
  tests: [],
  testDescriptions: [],
  testResults: [],
  loading: false,
  results: [],
  roomId: "",
  finished: false,
  waiting: false,
  message: ""
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CLEAR_OPPONENT_PROMPT:
      return {
        ...state,
        solution: "",
        opponentSolution: "",
        console: [],
        title: "",
        finished: true,
        waiting: false
      };

    case LOGIN_SUCCESS:
      const user = jwtDecode(action.token).user;
      return {
        ...state,
        player: user
      };

    case UPDATE_JWT_SUCCESS:
      const newUser = jwtDecode(action.token).user;
      return {
        ...state,
        player: newUser
      };

    case `UPDATE_USER`: {
      return {
        ...state,
        player: action.payload
      };
    }

    case DUEL_SUBMITION_SUCCESS:
      return {
        ...state,
        results: action.data.results,
        testResults: action.data.testResults,
        message: action.data.message,
        console: action.data.testResults,
        loading: false
      };

    case SET_DUEL_COMPLETE:
      return {
        ...state,
        passing: true,
        title: "",
        loading: false,
        finished: true,
        waiting: false
      };

    case SET_DUEL_ROOM:
      return {
        ...state,
        roomId: action.payload
      };

    case CLEAR_DUEL_PROMPT:
      return {
        ...state,
        solution: "",
        opponentSolution: "",
        opponentConsole: [],
        title: "",
        loading: false,
        finished: true,
        waiting: false
      };

    case PLAYER_JOINED_DUEL:
      let opponent;
      action.payload.forEach(player => {
        if (player.username !== state.player.username) {
          opponent = player;
        }
      });
      return {
        ...state,
        opponent: opponent
      };

    case `UPDATE_CLIENT_USER`:
      if (action.payload.username !== state.player.username) {
        return {
          ...state,
          opponent: action.payload
        };
      } else {
        return {
          ...state,
          player: action.payload
        };
      }

    case GET_PROMPT_DUEL:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        solution: action.payload.solution,
        opponentSolution: action.payload.solution,
        tests: action.payload.tests,
        testDescriptions: action.payload.testDescriptions,
        console: [],
        opponentConsole: [],
        passing: false,
        opponentPassing: false
      };

    case PLAYER_TYPING:
      return {
        ...state,
        opponentSolution: action.payload
      };

    case OPPONENT_RESULTS:
      let passing = true;
      action.payload.filter(result => {
        if (result.passing === false) {
          passing = false;
        }
      });
      return {
        ...state,
        opponentConsole: action.payload,
        opponentPassing: passing
      };

    case DUEL_SOLUTION_CHANGE:
      return {
        ...state,
        [action.payload.inputType]: action.payload.input
      };

    case RESET_RESULTS_DUEL:
      return {
        ...state,
        console: [],
        opponentConsole: []
      };

    case SET_CONSOLE_RESULTS:
      return {
        ...state,
        console: action.payload,
        loading: false
      };

    case RESET_CONSOLE_RESULTS:
      return {
        ...state,
        console: [],
        loading: true
      };

    case CLEAR_OPPONENT_CONSOLE:
      return {
        ...state,
        opponentConsole: []
      };

    case "UPDATE_CLIENT_OPPONENT":
      if (action.payload.username !== state.player.username) {
        return {
          ...state,
          opponent: action.payload
        };
      } else {
        return {
          ...state,
          player: action.payload
        };
      }

    case "RESET_DUEL_FINISHED":
      return {
        ...state,
        waiting: true
      };

    default:
      return {
        ...state
      };
  }
};
