import { createPostEpic, fetchPostsEpic, changeRouteEpic } from "./epic_posts";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(
    fetchPostsEpic,
    createPostEpic,
    changeRouteEpic
);