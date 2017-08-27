import * as ActionTypes from "../ActionTypes";
import { createPostFulfilled, fetchPosts, fetchPostsFulfilled, fetchPostsWithIdFulfilled, fetchPostsWithIdNotFound } from "../actions";
import {store, history} from "../configureStore";
import { Observable } from "rxjs/Observable";
import "../reactivex";
import map from "lodash/fp/map";
import flatMap from "lodash/fp/flatMap";
import flatMapDeep from "lodash/fp/flatMapDeep";
import filter from "lodash/fp/filter";
import find from "lodash/fp/find";
import {deletePostsWithIdFulfilled} from "../actions/index";
import {CREATE_POST_REJECTED} from "../ActionTypes";
import {DELETE_POSTS_WITH_ID_REJECTED} from "../ActionTypes";
import {FETCH_POSTS_REJECTED} from "../ActionTypes";
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "key=davide123";

export  const fetchPostsEpic = (action$) => {
    return action$.filter$((action$)=> action$.type === ActionTypes.FETCH_POSTS)
        .mergeMap$(action$ => {
          return  Observable.ajax$.getJSON(`${ROOT_URL}/posts/?${API_KEY}`)
                .map$(response => fetchPostsFulfilled(response), (err) => {console.log(err);});
        }).catch$(error => Observable.of$({
            type: FETCH_POSTS_REJECTED,
            payload: error.xhr.response,
            error: true
        }));
};

export const fetchPostsWithIdEpic = (action$) => {

    return action$.filter$((action$)=> action$.type === ActionTypes.FETCH_POSTS_WITH_ID)
        .mergeMap$(action$ => {
            console.log(action$.payload);
            return  Observable.ajax$.getJSON(`${ROOT_URL}/posts/?${action$.payload}&amp;${API_KEY}`)
                .map$(
                    (posts) => {
                        let post = posts.filter((post)=>{return post.id === parseInt(action$.payload);});
                        console.log(post);
                        if (post.length > 0) {
                          return  fetchPostsWithIdFulfilled(post);
                        } else {
                            history.push("/not-found");
                            return fetchPostsWithIdNotFound("404");
                        }
                    }
                ).catch$(error => Observable.of$({
                    type: CREATE_POST_REJECTED,
                    payload: error.xhr.response,
                    error: true
                  })
                .debug("give me result"));
        });

};

export  const createPostEpic = (action$) => {
    return action$.filter$((action$)=> action$.type === ActionTypes.CREATE_POST)
        .mergeMap$(action$ => {
                console.log("action$ is...");
                console.log(action$);
                let { values, history } = action$.payload;
                return   Observable.ajax$.post(`${ROOT_URL}/posts/?${API_KEY}`, values)
                        .map$(
                            (data) => {
                                if (data.status === 201) {
                                    console.log("history after data.status 201...");
                                    console.log(history);
                                    console.log("Success status", data.status);
                                    history.push("/");
                                    return createPostFulfilled(data.status);
                                }
                            }
                        ).catch$(error => Observable.of$({
                            type: CREATE_POST_REJECTED,
                            payload: error.xhr.response,
                            error: true
                    }));
        });
};

export  const deletePostsWithIdEpic = (action$) => {
    return action$.filter$((action$)=> action$.type === ActionTypes.DELETE_POSTS_WITH_ID)
        .mergeMap$(action$ => {
            return  Observable.ajax$.delete(`${ROOT_URL}/posts/${action$.payload}&amp;${API_KEY}`)
                .map$(
                    (data) => {
                            console.log("history after data.status 201...");
                            console.log(history);
                            console.log("Success status", data.status);
                            history.push("/");
                            return deletePostsWithIdFulfilled(action$.payload);
                    }
                ).catch$(error => Observable.of$({
                    type: DELETE_POSTS_WITH_ID_REJECTED,
                    payload: error.xhr.response,
                    error: true
                }));
        });
};

/* eslint-disable */

//  export const changeRouteEpic = (action$) => {
//         return action$.filter((action$)=> action$.type === ActionTypes.CHANGE_ROUTE)
//             .switchMap( 
//                 (action$) => concat$(
//                     from$(store.dispatch(fetchPosts())),
//                     of$(store.dispatch(history.replace(action$.payload)),
     
//                 )
//             ));
//         };

        //
        // export const changeRouteEpic = (action$) => {
        //     return action$
        //     .filter((action$)=> action$.type === ActionTypes.CHANGE_ROUTE)
        //     .mergeMap(action$ => {
        //         // window.location.href = action$.payload;
        //         console.log("final store.....");
        //         console.log(store.getState());
        //         store.dispatch(push(action$.payload));
        //     });
        // };

/* eslint-enable */