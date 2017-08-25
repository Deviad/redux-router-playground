import { changeRouteEpic, createPostEpic, fetchPostsEpic, fetchPostsWithIdEpic } from "./epic_posts";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(
    fetchPostsEpic,
    fetchPostsWithIdEpic,
    createPostEpic
);