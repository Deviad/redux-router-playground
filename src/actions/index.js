import * as ActionTypes from "../ActionTypes";

// action creators

export function fetchPosts (request) { return {type: ActionTypes.FETCH_POSTS, payload: request };}
export function fetchPostsFullfilled (body) { return {type: ActionTypes.FETCH_POSTS_FULLFILLED, payload: body };}