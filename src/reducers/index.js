import { combineReducers } from "redux";
import postsReducer from "./reducer_posts";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

export const rootReducer = combineReducers({
    posts: postsReducer,
    form: formReducer,
    router: routerReducer
});
