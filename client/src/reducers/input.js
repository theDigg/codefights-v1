import { INPUT_CHANGE, CLEAR_ALL_INPUTS } from "../actions/types";

const initialState = {
  username: "",
  password: "",
  solution: "",
  submition_title: "",
  submition_body: "",
  submition_tests: "",
  submition_descriptions: "",
  submition_solution: "",
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.inputType]: action.payload.input
      };

    case CLEAR_ALL_INPUTS:
      return {
        ...initialState
      };

    case "LOGIN":
      return {
        ...initialState
      };

    case "SIGNUP":
      return {
        ...initialState
      };

    default:
      return state;
  }
};
