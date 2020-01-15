import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { chatReducer } from "./chat";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    chat: chatReducer
  });

export default createRootReducer;
