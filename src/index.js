/* eslint-disable */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {store, history} from "./configureStore";
// import { BrowserRouter, Route , Switch} from "react-router-dom";
import {Switch, Route} from "react-router-dom";
import PostsIndex from "./containers/posts_index";
import PostsNew from "./containers/posts_new";
import PostsShow from "./containers/posts_show";
import registerServiceWorker from "./registerServiceWorker";
import NotFound from "./components/not_found";
import { ConnectedRouter, push } from "react-router-redux";
import { Observable } from "rxjs/Observable";
import "./reactivex";

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
                console.error('ERROR >>> ',message , err);
            }
        },
        function () {
            if (debuggerOn) {
                console.log('Completed.');
            }
        }
    );
};



ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={PostsIndex} />
                <Route exact path="/posts/new" component={PostsNew} />
                <Route exact path="/posts/:id" component={PostsShow} />
                <Route exact path="/not-found" component={NotFound} />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </div>
 </ConnectedRouter>
    </Provider>, 
document.getElementById("root"));
registerServiceWorker();
/* eslint-enable */