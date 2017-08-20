import { combineReducers } from 'redux';
import postsReducer from './reducer_posts';
export const rootReducer = combineReducers({
    posts: postsReducer
});
