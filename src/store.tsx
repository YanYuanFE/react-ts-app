import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import createRootReducer from "./reducers";

export const history = createHashHistory();

const rootReducer = createRootReducer(history);

export default function configureStore(preloadedState: any) {
  const store = createStore(
    rootReducer, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        logger,
        routerMiddleware(history) // for dispatching history actions
      )
    )
  );

  return store;
}

export type AppState = ReturnType<typeof rootReducer>;
