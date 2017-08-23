import * as ActionTypes from "../ActionTypes";
import { createPostFulfilled, fetchPostsFulfilled, changeRoute } from "../actions";
import {store} from "../providers";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/dom/ajax";
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=davide123";

export  const fetchPostsEpic = (action$) => {
 
    return action$.filter((action$)=> action$.type === ActionTypes.FETCH_POSTS)
        .mergeMap(action$ => {
          return  Observable.ajax.getJSON(`${ROOT_URL}/posts/${API_KEY}`)
                .map(response => fetchPostsFulfilled(response), (err) => {console.log(err);});
        });
};

export  const createPostEpic = (action$, cb) => {
    console.log(action$.cb);
    return action$.filter((action$)=> action$.type === ActionTypes.CREATE_POST)
        .concatMap(action$ => {
                return   Observable.ajax.post(`${ROOT_URL}/posts/${API_KEY}`, action$.payload)
                        .map(
                            (data) => {
                                if (data.status === 201) {
                                    console.log("Success status", data.status);
                                    store.dispatch(changeRoute("/"));
                                    // return createPostFulfilled(data.status);
                                }
                                else {console.log("Server error is", data.status);}
                            },
                            (err) => {console.log(err);}
                        );
        });
};
/* eslint-disable */
export const changeRouteEpic = (action$) => {
    return action$.filter((action$)=> action$.type === ActionTypes.CHANGE_ROUTE)
    .mergeMap(action$ => {
        window.location.replace(action$.payload);
    });
};
/* eslint-enable */