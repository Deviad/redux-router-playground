import {Observable} from "rxjs/Observable";

import "rxjs/observable/concat";
import "rxjs/observable/merge";
import {from} from "rxjs/observable/from";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/debounceTime";

Observable.prototype.concat$ = Observable.prototype.concat;
Observable.prototype.merge$ = Observable.prototype.merge;
Observable.prototype.from$ = Observable.prototype.from;
Observable.of$ = of;
Observable.from$ = from;
Observable.fromPromise$ = fromPromise;
Observable.prototype.of$ = Observable.prototype.of;
Observable.prototype.map$ = Observable.prototype.map;
Observable.prototype.mergeMap$ = Observable.prototype.mergeMap;
Observable.prototype.startWith$ = Observable.prototype.startWith;
Observable.prototype.filter$ = Observable.prototype.filter;
Observable.prototype.switchMap$ = Observable.prototype.switchMap;
Observable.prototype.catch$ = Observable.prototype.catch;
Observable.prototype.do$ = Observable.prototype.do;
Observable.ajax$ = Observable.ajax;
Observable.prototype.combineLatest$ = Observable.prototype.combineLatest;
Observable.prototype.debounceTime$ = Observable.prototype.debounceTime;
Observable.prototype.toArray$ = Observable.prototype.toArray;


const debuggerOn = true;

Observable.prototype.debug = function (message) {
    return this.do(
        function (next) {
            if (debuggerOn) {
                console.log(message, next);
            }
        },
        function (err) {
            if (debuggerOn) {
                console.error("ERROR >>> ",message , err);
            }
        },
        function () {
            if (debuggerOn) {
                console.log("Completed.");
            }
        }
    );
};
