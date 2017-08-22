import * as ActionTypes from "../ActionTypes";
import { createPostFulfilled, fetchPostsFulfilled } from "../actions";
import { Observable } from "rxjs/Observable";
import {RxHttpRequest} from "rx-http-request";
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


const API_KEY = "davide123";

export  const fetchPostsEpic = (action$) => {
    const ROOT_URL = `http://reduxblog.herokuapp.com/api/posts?key=${API_KEY}`;
    const options = {
       json: true
    };

    return action$.filter((action$)=> action$.type === ActionTypes.FETCH_POSTS)
        .mergeMap(action$ => (
                    RxHttpRequest.get(`${ROOT_URL}`, options)
                        .map(res => {return res.body;})
                        .map(response => fetchPostsFulfilled(response), (err) => {console.log(err);}))

        );
};
export  const createPostEpic = (action$) => {
    const ROOT_URL = `http://reduxblog.herokuapp.com/api/posts?key=${API_KEY}`;    
    const options = {
       json: true,
       body: action$.payload
    };

    return action$.filter((action$)=> action$.type === ActionTypes.CREATE_POST)
        .mergeMap(action$ => {
            console.log('asdasdas');        
                return   RxHttpRequest.post(`${ROOT_URL}`, options)
                        .map(res => {return res.body;})
                        .map(response => createPostFulfilled(response), (err) => {console.log(err);});});
};