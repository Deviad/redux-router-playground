import * as ActionTypes from "../ActionTypes";
import * as _ from "lodash";

export default function postsReducer(state={}, action) {
    switch (action.type) {
        case ActionTypes.FETCH_POSTS_FULLFILLED:
            return action.payload.reduce((acc, post) => {
                // console.log(acc);
                acc[post.id] = post;
                return acc;
            }, { ...state });
        // use Object.assign if object-spread
        // syntax isn't supported
        // return    Object.assign({}, state);

        default:
            return state;
    }
};