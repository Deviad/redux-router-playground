// import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from "redux";
// import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from "./reducers";
import { rootEpic } from "./epics";
// const history = createBrowserHistory();
import { combineEpics, createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware((combineEpics(rootEpic)));

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware,
                // routerMiddleware(history)
            )
        )
    );
    return store;
}