import * as ActionTypes from "../ActionTypes";


export default function postsReducer(state={}, action) {
    switch (action.type) {
        case ActionTypes.FETCH_POSTS_FULFILLED:
        case ActionTypes.FETCH_POSTS_WITH_ID_FULFILLED:
            console.log("action payload in reducer....");
            console.log(action.payload);
            if (!!!action.payload) {
                return state;
            }
            return action.payload.reduce((acc, post) => {
                acc[post.id] = post;
                return acc;
            }, { ...state });
        // use Object.assign if object-spread
        // syntax isn't supported
        // Object.assign({}, state);

        case ActionTypes.FETCH_POSTS_WITH_ID_NOT_FOUND:
            return "POST NOT FOUND";


        case ActionTypes.CREATE_POST_FULFILLED:
            return {...state };


        default:
            return state;
    }
};