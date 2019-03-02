import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import form from "./reducers/form";
import error from "./reducers/error";
import score from "./reducers/score";
import auth from "./reducers/auth";
import theme from "./reducers/theme";
import multiplayer from "./reducers/multiplayer";
import duel from "./reducers/duel";
import online from "./reducers/online";
import chat from "./reducers/chat";
import input from "./reducers/input";
import authMiddleware from "./middleware/auth";
import errorMiddleware from "./middleware/error";
import themeMiddleware from "./middleware/theme";
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  combineReducers({
    form,
    error,
    auth,
    theme,
    multiplayer,
    score,
    duel,
    online,
    chat,
    input
  }),
  composeWithDevTools(
    applyMiddleware(thunk, authMiddleware, errorMiddleware, themeMiddleware)
  )
);
