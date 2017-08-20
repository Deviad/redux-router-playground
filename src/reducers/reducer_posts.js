import * as ActionTypes from '../ActionTypes';

export default function postsReducer(state=[], action) {
    switch (action.type) {
        case ActionTypes.FETCH_POSTS_FULLFILLED:

            return [
                ...state,
                // `login` is the username
                action.payload
            ];

        // return    Object.assign({}, state, {weather: action.payload});

        default:
            return state;
    }
};