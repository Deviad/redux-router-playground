import * as ActionTypes from "../ActionTypes";


export default function postsReducer(state={}, action) {
    switch (action.type) {
        case ActionTypes.FETCH_POSTS_FULFILLED:
        case ActionTypes.FETCH_POSTS_WITH_ID_FULFILLED:
            return action.payload.reduce((acc, post) => {
                // console.log(acc);
                acc[post.id] = post;
                return acc;
            }, { ...state });
        // use Object.assign if object-spread
        // syntax isn't supported
        // Object.assign({}, state);
        case ActionTypes.CREATE_POST_FULFILLED:
            return {...state };
        default:
            return state;
    }
};