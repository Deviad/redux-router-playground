import * as ActionTypes from '../ActionTypes';
import {fetchWeather} from '../actions';
import { Observable } from 'rxjs/Observable';
import {RxHttpRequest} from 'rx-http-request';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {fetchPostsFullfilled} from '../actions';

const API_KEY = 'davide123';
const ROOT_URL = `http://reduxblog.herokuapp.com/api/posts?key=${API_KEY}`;
export  const fetchPostsEpic = (action$) => {
    const options = {
       json: true
    };

    return action$.filter((action$)=> action$.type === ActionTypes.FETCH_POSTS)
        .mergeMap(action$ => (
                    RxHttpRequest.get(`${ROOT_URL}`, options)
                        .map(res => {console.log(res.body); return res.body;})
                        .map(response => fetchPostsFullfilled(response), (err) => {console.log(err);}))

        );
};