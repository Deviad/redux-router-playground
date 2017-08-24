import * as ActionTypes from "../ActionTypes";
import { createPostFulfilled, fetchPosts, fetchPostsFulfilled, fetchPostsWithIdFulfilled, changeRoute } from "../actions";
import {store, history} from "../configureStore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/debounceTime";
import { concat as concat$ } from "rxjs/observable/concat";
import { from as from$ } from "rxjs/observable/from";
import { of as of$ } from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/dom/ajax";
import {push} from "react-router-redux";
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "key=davide123";

export  const fetchPostsEpic = (action$) => {
 
    return action$.filter((action$)=> action$.type === ActionTypes.FETCH_POSTS)
        .mergeMap(action$ => {
          return  Observable.ajax.getJSON(`${ROOT_URL}/posts/?${API_KEY}`)
                .map(response => fetchPostsFulfilled(response), (err) => {console.log(err);});
        });
};

export const fetchPostsWithIdEpic = (action$) => {
    return action$.filter((action$)=> action$.type === ActionTypes.FETCH_POSTS_WITH_ID)
    .mergeMap(action$ => {
      return  Observable.ajax.getJSON(`${ROOT_URL}/posts/?${action$.payload}&amp;${API_KEY}`)
            .map(response => fetchPostsWithIdFulfilled(response), (err) => {console.log(err);});
    });
};

export  const createPostEpic = (action$) => {
    const actionVectorizer = ((action$) => {
        if (action$)
        return action$.isArray() ?   [].concat(...action$.mergeMap(x => actionVectorizer(x))) : action$;
    })();
    return action$.filter((action$)=> action$.type === ActionTypes.CREATE_POST)
        .mergeMap(action$ => {
                console.log("action$ is...");
                console.log(action$);
                let { values, history } = action$.payload;
                return   Observable.ajax.post(`${ROOT_URL}/posts/?${API_KEY}`, values)
                        .map(
                            (data) => {
                                if (data.status === 201) {
                                    console.log("Success status", data.status);
                                    history.push("/");
                                    // return createPostFulfilled(data.status);
                                }
                                else {console.log("Server error is", data.status);}
                            },
                            (err) => {console.log(err);}
                        );
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