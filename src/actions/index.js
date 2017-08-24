import * as ActionTypes from "../ActionTypes";

// action creators

export function fetchPosts (request) { return {type: ActionTypes.FETCH_POSTS, payload: request };}
export function fetchPostsFulfilled (body) { return {type: ActionTypes.FETCH_POSTS_FULFILLED, payload: body };}
export function fetchPostsWithId (request) { return {type: ActionTypes.FETCH_POSTS_WITH_ID, payload: request };}
export function fetchPostsWithIdFulfilled (body) { return {type: ActionTypes.FETCH_POSTS_WITH_ID_FULFILLED, payload: body };}
export function createPost (request) { return {type: ActionTypes.CREATE_POST, payload: request};}
export function createPostFulfilled (body) { return {type: ActionTypes.CREATE_POST_FULFILLED, payload: body };}
// export function changeRoute (route) { console.log("figa"); return {type: ActionTypes.CHANGE_ROUTE, payload: route };}
