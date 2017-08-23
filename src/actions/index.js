import * as ActionTypes from "../ActionTypes";

// action creators

export function fetchPosts (request) { return {type: ActionTypes.FETCH_POSTS, payload: request };}
export function fetchPostsFulfilled (body) { return {type: ActionTypes.FETCH_POSTS_FULFILLED, payload: body };}
export function createPost (request) { return {type: ActionTypes.CREATE_POST, payload: request};}
export function createPostFulfilled (body) { return {type: ActionTypes.CREATE_POST_FULFILLED, payload: body };}
