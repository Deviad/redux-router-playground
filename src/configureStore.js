/* eslint-disable */
import { createStore, applyMiddleware, compose } from "redux";
// import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from "./reducers";
import { rootEpic } from "./epics";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {routerMiddleware} from "react-router-redux";
import {history} from "./providers";
const epicMiddleware = createEpicMiddleware((combineEpics(rootEpic)));


export default function configureStore() {
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
/* eslint-enable */