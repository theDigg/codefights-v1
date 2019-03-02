import { reducer as formReducer } from "redux-form";

export default formReducer.plugin({
  comment: (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  }
});
