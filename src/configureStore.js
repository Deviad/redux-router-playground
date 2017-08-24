/* eslint-disable */
import { createStore, applyMiddleware, compose } from "redux";
// import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from "./reducers";
import { rootEpic } from "./epics";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {routerMiddleware} from "react-router-redux";

import createHistory from "history/createBrowserHistory";


const epicMiddleware = createEpicMiddleware((combineEpics(rootEpic)));


function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware,
                routerMiddleware(history)
            )
        )
    );
    return store;
}



export const store = configureStore();
export const history = createHistory();
/* eslint-enable */